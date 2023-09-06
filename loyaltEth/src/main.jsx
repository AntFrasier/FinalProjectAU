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
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { AuthProvider } from './context/AuthProvider';


const chains = [goerli];

const projectId = '34a5caafeb6d780a6b52114437dd57b6' //todo move it to env variables.

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
        <AuthProvider>
          <App />
        </AuthProvider>
      </WagmiConfig>
      <Web3Modal
          projectId= {projectId}
          ethereumClient={ethereumClient}
          />
    </BrowserRouter>
  </React.StrictMode>,
)
