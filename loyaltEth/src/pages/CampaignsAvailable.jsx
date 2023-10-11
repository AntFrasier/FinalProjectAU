import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Campaign from '../component/Campaign';
import { Flex } from '@chakra-ui/react';

const CampaignsAvailable = () => {
    const [allCampaigns, setAllCampaigns] = useState([]);

    useEffect(()=>{
        const controller = new AbortController();
        const getAllCampaigns = async () =>{
            try {
                await axios.get("/campaign/all")
                    .then((response) => {
                        console.log(response)
                        setAllCampaigns(response?.data.campaigns);
                    })
            } catch (err) {
                alert(err)
            }
        }

        getAllCampaigns();

        return () => controller.abort();
    },[])

  return (
    <Flex direction={"row"}>
        {allCampaigns?.length > 0 ? (
            allCampaigns.map((campain) => <Campaign campaign={campain} />)
        ):(
            null
        )}
    </Flex>
  )
}

export default CampaignsAvailable