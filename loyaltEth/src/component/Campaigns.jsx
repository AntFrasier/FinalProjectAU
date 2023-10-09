import { List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Addcampagn from "./AddCampagn";
import CreateCampagnModal from "./CreateCampagnModal";
import {useAccount, useContractRead} from "wagmi";
import contractsData from "../artifacts/deployedContracts";

 

const Campaigns = () => {

    const {address, isConnected} = useAccount();
    const [campagns, setCampagns] = useState(null);
    const [modal, setModal] = useState(false);
    
    // const LoyaltEthContract = useContract({
    //     address:contractsData.LoyaltEthFactory.address,
    //     abi: contractsData.LoyaltEthFactory.abi,
    //     })
    const getMyContracts= (indexes, allContractsAdresses) => {
        console.log(allContractsAdresses,"allconrtacts")
        const myCampagns = [];
        for (let i=0; i<indexes.length; i++){
            myCampagns.push([allContractsAdresses[0][indexes[i]], allContractsAdresses[1][indexes[i]]])
            console.log("mycampagns ",myCampagns)
        }
        setCampagns(myCampagns)
    }

    const {data:allContractsAdresses} = useContractRead({
        address:contractsData.LoyaltEthFactory.address,
        abi: contractsData.LoyaltEthFactory.abi,
        functionName:"getContractArray",
        onError: (err) => console.log(err),
        onSuccess: (allContractsAdresses) => console.log("success data :",allContractsAdresses)
        })

    const {data:indexes} = useContractRead({
        address:contractsData.LoyaltEthFactory.address,
        abi: contractsData.LoyaltEthFactory.abi,
        functionName:"getIndexes",
        args:[address],
        onError: (err) => console.log(err),
        onSuccess: (indexes) => {
            console.log("success data :",indexes);
            getMyContracts(indexes,allContractsAdresses)
        }
        })

  



    // console.log(LoyaltEthContract)
    // console.log(client)
    
        // useEffect( () => {
        //     if(data) {
        //     for (let i=0; i<data, i++){
        //         const {data:test} = useContractRead({
        //             address:contractsData.LoyaltEthFactory.address,
        //             abi: contractsData.LoyaltEthFactory.abi,
        //             functionName:"ownerIndexes",
        //             args:[address, i],
        //             onError: (err) => console.log(err),
        //             onSuccess: (test) => console.log("success data :",test)
        //             })
        //     }
        //     console.log(array)
        // }
        // },[isSuccess,isLoading, isError])


    console.log(campagns)
    return ( 
        <>
            <List display="flex" gap={3}>
                {campagns === null ? ( 
                    <ListItem>no Campagn</ListItem> 
                ) : (
                    campagns?.map( campagn => <ListItem key={campagn[0]}>{campagn[0]} {campagn[1]}</ListItem>)
                ) 
                }
                <ListItem><Addcampagn setModal={setModal} modal={modal}/></ListItem>
            </List>
           
            {modal? <CreateCampagnModal setModal={setModal} contractsData={contractsData}/> : null}
        </>
    )
}

export default Campaigns;