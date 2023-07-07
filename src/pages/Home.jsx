import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Display } from "../components";
const Home = () => {

    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaign] = useState([]);
    const {address, getCampaigns, contract} = useStateContext()

    const getAllCampaigns = async() => {
        setLoading(true)
        const data = await getCampaigns()
        setCampaign(data)
        setLoading(false)
    }
    useEffect(() => {
        if(contract){
            getAllCampaigns()
        }
    },[address, contract])
    return(
        <Display title = "Total Campaigns" loading = {loading} campaigns = {campaigns} />
    )
}

export default Home;