import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { goerli } from "wagmi/chains";
import Header from "./component/Header";

const chains = [goerli];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "" }),
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
    <WagmiConfig client={wagmiClient}>
      <Header />
       
        <Web3Modal
      projectId= ""
      ethereumClient={ethereumClient}
    />
      
    </WagmiConfig>

    
  </>
  )
}

export default App
