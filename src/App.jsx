import { ConnectWallet } from "@thirdweb-dev/react";
import { Route,Routes } from "react-router-dom";
import { Home, CreateCampaign, Profile, Details, Payments } from "./pages";
import { Sidebar, Navbar } from "./components";

export default function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#171717] min-h-screen flex flex-row overflow-hidden">
     <div className="sm:flex hidden mr-10"><Sidebar /></div>
     <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar />

      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/create-campaign" element = {<CreateCampaign/>}></Route>
        <Route path = "/profile" element = {<Profile />}></Route>
        <Route path = "/campaign-details/:id" element = {<Details />}></Route>
        <Route path = "/payments" element = {<Payments />}></Route>
      </Routes>
     </div>
    </div>
  );
}
