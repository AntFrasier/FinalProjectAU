import { Button, Flex, Heading, Spinner} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MyNft from './MyNft';


const MemberComponent = () => {
  const [myNfts, setMyNfts] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [idToWithdraw, setIdeToWithdraw] = useState(null);
  const [partnerVendorAddress, setPartnerVendorAddress] = useState();
  const [refresh, setRefresh] = useState();

  const axiosPrivate =useAxiosPrivate();
  const {auth} = useAuth();
  const user = auth?.user;

  useEffect(()=>{
    const controller = new AbortController();
    const getMyNfts = async () => {
      setIsloading(true);
      try{
        let response = await axiosPrivate.get(`/nfts/${user?.address}`)
        console.log(response.data)
        setMyNfts(response.data.myNfts)
        
      } catch (err) {
        console.error("Error while geting nfts from DataBase", err)
      } finally {
        setIsloading(false)
      }
    }
    getMyNfts();
    return () => controller.abort();

  },[])

  

  return (
    <Flex direction={"column"}>
        <Heading as={"h2"}> Member page :</Heading>
        <Heading mt={5} as={"h3"}>Welcome {user?.name}</Heading>  
        My Nfts :
        <Flex direction={"row"}>
        {isLoading? ( 
          <Flex align={"center"} justify={"center"}> <Spinner /> </Flex>
        ) : (
        myNfts?.map((nft) => 
            <MyNft nft = {nft}  setRefresh= {setRefresh}/>
          )
        )}
        </Flex>
    </Flex>
  )
}

export default MemberComponent