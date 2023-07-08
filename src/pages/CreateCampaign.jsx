import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import ethmoney from "../assets/ethmoney.png";
import { Button, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {makeCampaign} = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        tag:'',
        description: '',
        target: '',
        image: '',
        deadline: ''
    })

    const handleFieldChange = (fieldname, e) => {
        setForm({...form, [fieldname]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        checkIfImage(form.image, async(exists) => {
            if(exists){
                await makeCampaign({...form, target: ethers.utils.parseUnits(form.target,18)})
                setLoading(false)
                navigate('/')
            }else{
                alert("Invalid Image")
                setForm({...form,image:""})
            }
        })
        
    }
    return(
        <div className="bg-[#1e293b] flex justify-center items-center flex-col p-3 rounded-[10px] sm:p-10">
            {loading && <Loader msg1 = {"Processing"} msg2 = {"Please Bare With Us"} />}
            <div className="flex justify-center items-center p-[16px] rounded-[10px] sm:min-w-[380px] bg-[#818cf8]">
                <h1 className="font-epilogue text-[20px] text-white  font-[800]">Create A Campaign</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px] mt-[65px]">
            <div className="flex flex-wrap gap-[40px]">
                <FormField  label = "Your Name" placeholder = "Anubhav" inputType = "text" value ={form.name} handleChange = {(e) => {
                    handleFieldChange('name',e)
                }}/>
                <FormField  label = "Title" placeholder = "Web Dev Challenge" inputType = "text" value ={form.title} handleChange = {(e) => {
                    handleFieldChange('title',e)
                }}/>   
                <FormField  label = "Tag" placeholder = "Example: General" inputType = "text" value ={form.tag} handleChange = {(e) => {
                    handleFieldChange('tag',e)
                }}/>   
                <FormField  label = "Description" placeholder = "Write Your Description" isTextArea={true} value ={form.description} handleChange = {(e) => {
                    handleFieldChange('description',e)
                }}/> 
                <div className="w-full flex justify-start items-center p-4 bg-[#a5b4fc] rounded-[10px] h-[120px]">
                    <img src={ethmoney}  className="w-[40px] h-[40px]" alt="ethmoney" />
                    <h4 className="font-bold ml-[10px] italic text-black text-[25px]">You Get All The 100% ETH Money</h4>
                </div>  
                <div className="flex flex-wrap gap-[40px]">
                <FormField  label = "Goal" placeholder = "0.5 ETH" inputType = "text" value ={form.target} handleChange = {(e) => {
                    handleFieldChange('target',e)
                }}/>
                <FormField  label = "End Date" placeholder = "End Date" inputType = "date" value ={form.deadline} handleChange = {(e) => {
                    handleFieldChange('deadline',e)
                }}/>
                <FormField  label = "Image URL" placeholder = "Place Image URL Here" inputType = "url" value ={form.image} handleChange = {(e) => {
                    handleFieldChange('image',e)
                }}/>

                <div className="flex justify-center items-center mt-[30px]">
                <Button type={'submit'} title = "Submit Campaign..." styles={'bg-[#9333ea] text-white'}/>
                </div>   
                </div>
            </div>
            </form>
        </div>
    )
}

export default CreateCampaign