import { useContext, createContext, useState } from "react";
import {useAddress, useContract, useMetamask, useContractWrite} from "@thirdweb-dev/react"
import { ethers } from "ethers";
import abi from "../../abi";


const Context = createContext();

export const StateProvider = ({children}) =>  {
    const {contract} = useContract("0x1083368aeA72B7f99879eF2cD86F742C5622621C",abi);
    const {mutateAsync: createCampaign} = useContractWrite(contract,'createCampaign');
    const {mutateAsync: getFunders} = useContractWrite(contract,'getFunders');
    const {mutateAsync: fundCampaign} = useContractWrite(contract,'fundCampaign');
    const [value, setValue] = useState("")
    const [campaigns, setCampaigns] = useState("")

    const address = useAddress();
    const connect = useMetamask();

    const makeCampaign = async(form) => {
        try{
        console.log(form.name,form.deadline,form.image,address);
        const data = await createCampaign({args:[ 
            address,
            form.title,
            form.tag,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
            
        ]})

        console.log(data);
    }
    catch(err){
        console.log(err);
    }
    }

    const getCampaigns = async() => {
        try{
            const campaigns = await contract.call('getCampaigns');
            const parsedData = campaigns.map((campaign,i) => ({
                owner: campaign.owner,
                title: campaign.title,
                tag: campaign.tag,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.lastDate.toNumber(),
                currentAmount: ethers.utils.formatEther(campaign.currentAmount.toString()),
                image: campaign.image,
                pid: i
            }))

            return parsedData
        }
        catch(err){
            console.log(err);
        }
    }

    const getOwnerCampaigns = async() => {
        try{
            const allCampaigns = await getCampaigns();
            const ownerCampaigns = allCampaigns.filter((campaign) => (campaign.owner === address))
            return ownerCampaigns;
        }
        catch(err){
            console.log(err);
        }
    }

    const searchCampaignByName = async(name) => {
        try{
            const allCampaigns = await getCampaigns();
            if(allCampaigns.length === 0){
                return allCampaigns;
            }
            const relatedCampaigns = allCampaigns.filter((campaign) => campaign.title?.toUpperCase()?.includes(name?.toUpperCase()))
            return relatedCampaigns
        }
        catch(err){
            console.log(err)
        }
    }

    const Fund = async(pid, amount) => {
        try{
            console.log(amount)
            const data = await fundCampaign({args:[pid], overrides: {
                value: ethers.utils.parseEther(amount)
            }})
            return data;
        }
        catch(err){
            console.log(err)
        }
    }

    const getFunds = async(pid) => {
        try{
            const funds = await getFunders({args:[pid]})
            const numOfDonations = funds[0]?.length

            const parsedFunds = []

            for(let i = 0;i < numOfDonations;i++){
                parsedFunds.push({
                    funder: funds[0][i],
                    fund: ethers.utils.formatEther(funds[1][i]).toString()
                })
            }

            return parsedFunds
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Context.Provider value = {{address, makeCampaign, contract, connect, getCampaigns, getOwnerCampaigns,getFunds, Fund, searchCampaignByName, value, setValue, campaigns, setCampaigns}}>
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);