import {
  EthereumClient,
  w3mConnectors,
  w3mProvider ,
} from "@web3modal/ethereum";
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";

import Index from "./pages/Index";
import About from "./pages/About";
import Header from "./component/Header";
import { Route, Routes, useNavigate } from 'react-router-dom';
import PartnerRegistration from "./component/PartnerRegistration";
import MemberRegistration from "./component/MemberRegistration";
import { publicProvider } from 'wagmi/providers/public'
import User from "./pages/User";
import axios from "axios";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import MemberComponent from "./component/MemberComponent";
import PartnerComponent from "./component/PartnerComponent";
import AdminComponent from "./component/AdminComponent";
import Partners from "./pages/Partners";


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const chains = [goerli];

const projectId = '34a5caafeb6d780a6b52114437dd57b6'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const wagmiKey = import.meta.env.VITE_WAGMI_KEY;
const w3ModalProjectId = import.meta.env.VITE_W3MODAL_PROJECT_ID;
const backendUrl = import.meta.env.VITE_BACKEND_ADDRESS;

// Wagmi client
// const { provider } = configureChains(chains, [
//   walletConnectProvider({ projectId: wagmiKey }),
// ]);
// const wagmiClient = createClient({ //
//   autoConnect: true,
//   connectors: modalConnectors({
//     projectId: "",
//     version: "1" | "2",
//     appName: "web3Modal",
//     chains,
//   }),
//   provider,
// });

// // Web3Modal Ethereum Client
// const ethereumClient = new EthereumClient(wagmiClient, chains);

console.log(publicClient)
function App() {
  const navigate = useNavigate();
  const [registred, setRegistred] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect( () => {
  //   setUser(localUser)
  // }, [localUser])


  async function chekUserRegistration(userAddress) {
    try {
      const response = await axios.get(backendUrl + "/user/" + `${userAddress}`)
      console.log ("response from the backend :",response)
      if (response.status == 200) {
          let user = response.data.data;
          //todo test the signature to see if the user has th PK....
          localStorage.setItem("user", JSON.stringify(user))
          console.log(account.isConnected)
          setRegistred(true);
          setUser(user);
          // navigate("/user");
      } else {
          console.log( "not found go to register");
          setUser(null)
          setRegistred(false);
          // navigate("/");
      }
    } catch (err) {
      alert(err)
    }
  }

  const account = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      let test = await chekUserRegistration(address);
      //todo check if user present, sign a message then test the message backend side 
    },
    onDisconnect() {
      navigate("/");
      setRegistred(false);
      localStorage.removeItem("user");
      console.log('Disconnected');

    },
  })

  console.log("account : " ,account)
  
   return (
    <>
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
      <Header />
     
      <Box pl={15}>
          <Routes>
              <Route path="/" element = {<Index registred={registred}/>}/> 
              <Route path="/about" element = {<About />} />
              <Route path="/partners" element = {<Partners backendUrl={backendUrl}/>} />

              <Route path="/register"  >
                <Route index element = {<Register />} />
                <Route path="partner" element = {<PartnerRegistration backendUrl={backendUrl}/>} />
                <Route path="member" element = {<MemberRegistration backendUrl={backendUrl}/>} />
              </Route>

              <Route path="/user"> 
                <Route index element = {<User user={user}/>} />
                <Route path="member" element = {<MemberComponent user={user} />} /> 
                <Route path="partner" element = {<PartnerComponent user={user} />} /> 
                <Route path="admin" element = {<AdminComponent user={user}/>} /> 
              </Route>

          </Routes>
          <Web3Modal
          projectId= {projectId}
          ethereumClient={ethereumClient}
          />
        </Box>
      </WagmiConfig>
    </ChakraProvider>
  </>
  )
}

export default App
