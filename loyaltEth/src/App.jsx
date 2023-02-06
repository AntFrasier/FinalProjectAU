import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Box, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import Index from "./pages/Index";
import About from "./pages/About";
import Header from "./component/Header";
import { Route, Routes } from 'react-router-dom';
import PartnerRegistration from "./pages/PartnerRegistration";


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const chains = [goerli];
// const wagmiKey = process.env.REACT_APP_WAGMI_KEY;
const wagmiKey = "6b4595a029164e67c18d4f47cb371a9e";
// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: wagmiKey }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "",
    version: "1" | "2",
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

console.log(wagmiClient)
function App() {
   return (
    <>
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
      <Header />
      <Box pl={15}>
          <Routes>
              <Route path="/" element = {<Index />} />
              <Route path="/about" element = {<About />} />
              <Route path="/partnerRegistration" element = {<PartnerRegistration />} />
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
