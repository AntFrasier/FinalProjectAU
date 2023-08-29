import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider ,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import { goerli } from "wagmi/chains";
import { Web3Modal, Web3Button } from "@web3modal/react";


const chains = [goerli];

const projectId = '34a5caafeb6d780a6b52114437dd57b6'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
       <App />
      </WagmiConfig>
      <Web3Modal
          projectId= {projectId}
          ethereumClient={ethereumClient}
          />
    </BrowserRouter>
  </React.StrictMode>,
)
