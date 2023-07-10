import { useContext, createContext, useState } from "react";
import {useAddress, useContract, useMetamask, useContractWrite} from "@thirdweb-dev/react"
import { BigNumber, ethers } from "ethers";
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
            const relatedCampaigns = allCampaigns.filter((campaign) => campaign.title?.toUpperCase()?.includes(name?.toUpperCase()) || campaign.tag?.toUpperCase()?.includes(name?.toUpperCase()))
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
            const ownerCampaigns = await getOwnerCampaigns()
            const funds = await getFunders({args:[pid]})
            const numOfDonations = funds[0]?.length

            const parsedFunds = []

            for(let i = 0;i < numOfDonations;i++){
                parsedFunds.push({
                    funder: funds[0][i],
                    fund: ethers.utils.formatEther(funds[1][i]).toString(),
                    ownerCampaigns
                })
            }

            return parsedFunds
        }
        catch(err){
            console.log(err)
        }
    }

    const getUserTransactions = async() => {
        try{
            if(!address){
                return {}
            }
            const campaigns = await getCampaigns()
            const transactions = []
            let funders
            let filteredFunders
            let fundAmount
            let totalFund = BigInt("0")
            for(let i = 0; i < campaigns.length; i++){
                funders = await getFunds(campaigns[i].pid)
                filteredFunders = funders.filter((item) => item.funder === address)
                fundAmount =  BigInt(ethers.utils.parseEther(filteredFunders[0].fund)._hex)
                transactions.push({campaign: campaigns[i].title, funds: filteredFunders[0]?.fund, owner: campaigns[i].owner})
                for(let j = 1;j < filteredFunders.length; j++){
                    fundAmount+=(BigInt(ethers.utils.parseEther(filteredFunders[j]?.fund)._hex))
                    transactions.push({campaign: campaigns[i].title, funds: filteredFunders[j]?.fund, owner: campaigns[i].owner})
                }
                totalFund+=fundAmount
                
            }

            totalFund = ethers.utils.formatEther(totalFund)

            return {totalFund, transactions}
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Context.Provider value = {{address, makeCampaign, contract, connect, getCampaigns, getOwnerCampaigns,getFunds, Fund, searchCampaignByName, value, setValue, campaigns, setCampaigns, getUserTransactions}}>
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);