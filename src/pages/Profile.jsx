import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Display } from "../components";
const Profile = () => {

    const [loading, setLoading] = useState(false);
    const {address, getOwnerCampaigns, contract, campaigns, setCampaigns} = useStateContext()

    const getAllCampaigns = async() => {
        setLoading(true)
        const data = await getOwnerCampaigns()
        setCampaigns(data)
        setLoading(false)
    }
    useEffect(() => {
        if(contract){
            getAllCampaigns()
        }
    },[address, contract])
    return(
        <Display title = "Your Campaigns" loading = {loading} campaigns = {campaigns} />
    )
}

export default Profile;