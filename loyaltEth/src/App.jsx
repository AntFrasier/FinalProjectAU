import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig, useAccount  } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import Index from "./pages/Index";
import About from "./pages/About";
import Header from "./component/Header";
import { Route, Routes, useNavigate } from 'react-router-dom';
import PartnerRegistration from "./component/PartnerRegistration";
import { publicProvider } from 'wagmi/providers/public'
import User from "./pages/User";
import axios from "axios";


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const chains = [mainnet, goerli];
const wagmiKey = import.meta.env.VITE_WAGMI_KEY;
const w3ModalProjectId = import.meta.env.VITE_W3MODAL_PROJECT_ID;
const backendUrl = import.meta.env.VITE_BACKEND_ADDRESS;

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: wagmiKey }),
  publicProvider(),
]);
const wagmiClient = createClient({ //
  autoConnect: true,
  connectors: modalConnectors({
    projectId: w3ModalProjectId,
    version: "2",
    appName: "AuFinalProject",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

console.log(wagmiClient)



function App() {
  const navigate = useNavigate();

  async function getUser(userAddress) {
    try {
    await axios.get(backendUrl + "/user/" + `${userAddress}`).then(response => {
      console.log (response)
      if (response.status == 200) {
        let user = response.data.data;
        //todo test the signature to see if the user has th PK....
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/user");
      } else {
        navigate("/");
      }
    }
    )
    } catch (err) {
      alert(err)
    }
  }

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      getUser(address)
      //todo check if user present, sign a message then test the message backend side 
      //if user present redirect him to eiter user or partner or admin page
      //if not get him to register page
    },
    onDisconnect() {
      localStorage.removeItem("user");
      navigate("/");
      console.log('Disconnected');
    },
  })
  
   return (
    <>
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
      <Header />
      <Button onClick={() =>  getUser("0x123")}>Test getUser</Button>
      <Box pl={15}>
          <Routes>
              <Route path="/" element = {<Index />} />
              <Route path="/about" element = {<About />} />
              <Route path="/partnerRegistration" element = {<PartnerRegistration backendUrl={backendUrl}/>} />
              <Route path="/user" element = {<User />} />
          </Routes>
          <Web3Modal
          projectId= {wagmiKey}
          ethereumClient={ethereumClient}
          />
        </Box>
      </WagmiConfig>
    </ChakraProvider>
  </>
  )
}

export default App
