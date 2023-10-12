import { Button, Flex, Heading, Spinner, Text, useStatStyles } from '@chakra-ui/react';
import PartnersList from './PartnersList';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const MemberComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const [myNfts, setMyNfts] = useState(null);

  const axiosPrivate =useAxiosPrivate();
  const {auth} = useAuth();
  const user = auth?.user;

  const searchMyNfts = async () => {
    setLoading(true);
    await axiosPrivate("/nfts/refresh");
    setLoading(false)
  }

  useEffect(()=>{
    const controller = new AbortController();
    const getMyNfts = async () => {
      try{
        const response = await axiosPrivate.get(`/nfts/${user?.address}`);
        console.log(response)
        setMyNfts(response.data?.myNfts)
      } catch (err) {
        console.error("Error while geting nfts from DataBase")
      }
    }
    getMyNfts();
    return () => controller.abort();

  },[isLoading])

  return (
    <Flex direction={"column"}>
        <Heading as={"h2"}> Member page :</Heading>
        <Heading mt={5} as={"h3"}>Welcome {user?.name}</Heading>  
        My Nfts :
        {myNfts.map((nft)=> <img src={nft.rawMetadata.image} />)}
        {isLoading? <Spinner size={"xl"}/> : null}
        <Text>Your Nft ar not listed here yet ? <Button isLoading={isLoading} onClick={() => searchMyNfts()}>Searche my Nfts</Button></Text>
    </Flex>
  )
}

export default MemberComponent