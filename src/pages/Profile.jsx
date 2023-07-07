import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Display } from "../components";
const Profile = () => {

    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaign] = useState([]);
    const {address, getOwnerCampaigns, contract} = useStateContext()

    const getAllCampaigns = async() => {
        setLoading(true)
        const data = await getOwnerCampaigns()
        setCampaign(data)
        setLoading(false)
    }
    useEffect(() => {
        if(contract){
            getAllCampaigns()
        }
    },[address, contract])
    return(
        <Display title = "All Campaigns" loading = {loading} campaigns = {campaigns} />
    )
}

export default Profile;