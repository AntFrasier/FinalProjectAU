import { Box, List, ListItem, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Addcampaign from "./AddCampaign";
import CreateCampaignModal from "./CreateCampaignModal";
import {useAccount, useContractRead} from "wagmi";
import contractsData from "../artifacts/deployedContracts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Campaign from "./Campaign";

const Campaigns = () => {

    const {address, isConnected, isLoading} = useAccount();
    const [campaigns, setCampaigns] = useState(null);
    const [campaignToShow, setCampaignToShow] = useState(null);
    const [modal, setModal] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    
    
    useEffect(()=>{
        async function getCampaigns(){
            const response = await axiosPrivate.get(`/campaign/partner/${address}`)
            setCampaigns(response.data.campaigns)
        }
        const controller =new AbortController();
        if (isConnected){
        getCampaigns();
        }
        return () => controller.abort(); 
    },[address, isLoading, isConnected, modal])


    // console.log(campagns)
    return ( 
        <>
            <List display="flex" gap={3}>
                {campaigns == null || campaigns.length == 0 ? ( 
                    <ListItem>no Campaign</ListItem> 
                ) : (
                    campaigns?.map( campaign => 

                        <ListItem key={campaign._id} onClick={()=> setCampaignToShow(campaign)}>
                            <Flex direction={"column"}>
                                <p>Name : {campaign.name}</p>
                                <p>Website: {campaign.website}</p>
                                <p>NftAddress: {campaign.NFTContractAddress}</p>
                                <p>Vendor contract Adresse: {campaign.contractAddress}</p>
                                <p>Paiement Adresse: {campaign.PayementAddress}</p>
                            </Flex>
                            
                        </ListItem>

                ) )
                }
            </List>
                <Addcampaign setModal={setModal} modal={modal}/>
           
            {modal? <CreateCampaignModal setModal={setModal} contractsData={contractsData}/> : null}
            {campaignToShow? <Campaign campaign={campaignToShow} contractsData={contractsData}/> : null}
        </>
    )
}

export default Campaigns;