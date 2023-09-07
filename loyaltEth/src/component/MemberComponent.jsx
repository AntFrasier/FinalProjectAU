import { Flex, Heading } from '@chakra-ui/react';
import PartnersList from './PartnersList';
import useAuth from '../hooks/useAuth';

const MemberComponent = () => {
  const {auth} = useAuth();
  const user = auth?.user;

  return (
    <Flex direction={"column"}>
        <Heading as={"h2"}> Member page :</Heading>
        <Heading mt={5} as={"h3"}>Welcome {user?.name}</Heading>  
    </Flex>
  )
}

export default MemberComponent