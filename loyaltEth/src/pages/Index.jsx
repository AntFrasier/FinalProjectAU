import React from 'react';
import { Flex, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import contracts from "../artifacts/deployedContracts";

const Index = () => {
  const loyaltEthfactory =  contracts.LoyaltEthFactory.address
    return (
      <Flex flexDir={"column"} alignContent={"flex-start"} justifyContent={"center"} alignItems={"flex-start"} marginInline={"auto"} paddingInline={15} maxW={"1080px"}>

        <Heading fontSize={"3rem "} as={"h2"} marginBottom={15}>Bring loyalty to Blockchain</Heading>
        <Text>
          Welcome to loyaltEth! This Dapp has been created for my final Alchemy Project.
        </Text>
        <Text>
          This is a proof of concept more than a protype. It's Uggly, and needs to be more tested and improve ! It's open source, you can find the code  <Link color="blue" href="https://github.com/AntFrasier/FinalProjectAU" target="_blank" rel='noreferrer nofollow noopener'> here </Link>. The LoyaltEthFactory smart contract has been deployed <Link color="blue" href={`https://goerli.etherscan.io/address/${loyaltEthfactory}`} target="_blank" rel='noreferrer nofollow noopener'> on Goerli </Link>. 
        </Text>
        <Heading as={"h3"}marginTop={25}>How it works ?</Heading>
        <Text>First you have to connect your wallet by clicking on <Web3Button /> and register as a User or a partner. A partner is a company that have a service or a product to promote. It can be any company that accept crypto currencies as payement. &#40;for now only ETH is supported&#41; A user is anyone that have a Wallet and want to use one of the services that are proposed bye our partners.</Text> 
        <Heading fontSize={"2rem "}as={"h3"} marginTop={25}>As a Partner</Heading>
        <Text>You can create a campaign, it is like a loyalty card! Set the name of your campaign, give a short description, put a link to your service. Then you'll have to set the number of used required to gain the reward (ex, buy 10 times), set the percent reward, like 10%, and finaly set the numbers of days of validity(15 days).</Text>
        <Text>If the customer used your service the 10 times during those 15 days, he'll be able to withdraw his reward. If he doesn't you can withdraw the balance of the nft Id from the contract.</Text>
        <Heading fontSize={"2rem "}as={"h3"} marginTop={25}>As a User</Heading>
        <Text>You can mint a loyaltEth card from one of our partner's <Link color="blue" href='/campaigns'> campaigns.</Link> You can see all your nfts on your dashboard.(once you have registred) Each Nft is an SVG nft that show you the numbers of time you used it, the numbers of days that remain to fulffill the required used and the balance of rewards that you'll be able to withdraw. As soon as the loyaltEth card is full (ex 10/10)!  you click on the withdraw button that will appears under your nft. If the validity date is passed the withdraw will go back to the partner, so must withdraw before the Dead line !</Text>
        <Text>For an user as the owner of your LoyaltEth Card Nft to be able to gain his reward he'll have to : </Text>
          <UnorderedList paddingInline={20} paddingBlock={5}>
            <ListItem>
              buy "x" times the product, or use the service
            </ListItem>
            <ListItem>
              in a periode of max "d" days 
            </ListItem>
            <ListItem>
              withdraw the "p" pecent of cahback that you earned !
            </ListItem>
          </UnorderedList>
          
          <Text>If there is time left and you know that you'll not be able to fullfill your nft until the end, you can sell it on our market place ! Let say you have an nft that you used 5 times on 10, it holds 0.5 Eth ! you can sell it, and the new user will be able to use it the 5 more times and whithdraw the rewards before the end of validity. </Text>
        <Heading fontSize={"2rem "} as={"h3"} marginTop={25}>Contact</Heading>
        <Text>
          If you have any question, or want to work on this project and push it forward, please HMU on  <Link color="blue" href="https://twitter.com/MaranberC" target="_blank" rel='noreferrer nofollow noopener'>twitter</Link> or on my <Link color="blue" href="https://cyril-maranber.com/contacts/" target="_blank">personal website</Link>.
        </Text>
      </Flex>
    )
}

export default Index