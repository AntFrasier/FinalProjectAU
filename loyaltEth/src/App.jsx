import {
  EthereumClient,
  w3mConnectors,
  w3mProvider ,
} from "@web3modal/ethereum";
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig, useAccount, useSignMessage } from "wagmi";
import { goerli } from "wagmi/chains";
import useAuth from './hooks/useAuth';
import Index from "./pages/Index";
import About from "./pages/About";
import Header from "./component/Header";
import { Route, Routes, useNavigate } from 'react-router-dom';
import PartnerRegistration from "./component/PartnerRegistration";
import MemberRegistration from "./component/MemberRegistration";
import { publicProvider } from 'wagmi/providers/public'
import User from "./pages/User";
import axios from "./api/axios";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import MemberComponent from "./component/MemberComponent";
import PartnerComponent from "./component/PartnerComponent";
import AdminComponent from "./component/AdminComponent";
import Partners from "./pages/Partners";
import Admin from "./pages/Admin";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import CampaignsAvailable from "./pages/CampaignsAvailable";


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  grey: {
    50: "#f7fafc",
  },
  bgTrans: "rgba(0,0,0,0.5)"
}

const theme = extendTheme({ colors })

const wagmiKey = import.meta.env.VITE_WAGMI_KEY;
const w3ModalProjectId = import.meta.env.VITE_W3MODAL_PROJECT_ID;
const backendUrl = import.meta.env.VITE_BACKEND_ADDRESS || "//localhost:33550";

function App() {
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage()
  const navigate = useNavigate();
  const [registred, setRegistred] = useState(false);
  const [connectedUser, setConnectedUser] = useState();
  const [isConnecting, setIsConnecting] = useState(false);
  const { setAuth, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  async function getSigneMessage(userAddress) {
    const nonce = await axios.get(`/login/nonce/${userAddress}`) //get nonce from the back end to avoid duplicate signature loggIn
    console.log("nonce : ", nonce.data.data)
    return await signMessageAsync({ message :`Login to LoyaltEth/${userAddress}/${nonce.data.data}`});
  }

  async function login(userAddress) {
    try {
      setIsConnecting(true);
      const userSignature = await getSigneMessage(userAddress)
      console.log("userSignature", userSignature);
      const response = await axios.post("/login/" , {
        address : userAddress,
        signature :userSignature
      }).then( (response) => {
        console.log ("response from the login backend :",response);
        setIsConnecting(false);
        if (response.status == 200) {
            let user = response.data.data;
            user = { ...user, accessToken : response.data.accessToken };
            localStorage.setItem("connectedUser", JSON.stringify(user))
            setRegistred(true);
            setAuth({user});
            navigate("/user");
            //todo manage a connection not allready register
        } else {
            console.log( "not found go to register");
            setConnectedUser(null)
            setRegistred(false);
            navigate("/register");
        }
      })
    } catch (err) {
      alert(err)
    }
  }

  async function logout() {
    
    try {
      const response = await axiosPrivate.get(`/logout/${auth.user.address}`)
        .then( (response) => {
          console.log ("response from the logout backend :",response);
          if (response.status == 200) {
            console.log('****************************Disconnected********************************');
            setRegistred(false);
            setAuth(null);
            localStorage.removeItem("connectedUser");
            navigate("/home");
          } else {
              console.log( "Somethong when wrong whith the disconnect");
          }
        })
    } catch (err) {
      alert(err)
    }
  }

  const account = useAccount({
    
    onDisconnect() { //BUG this is not trigger some times .... why ??????? It seems that if i save app.jsx and not reload the page it is not trigger
      logout();
   },
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      if (isReconnected) {
        const connectedUser = JSON.parse( localStorage.getItem("connectedUser"))
        setAuth({user : connectedUser});
      } else {
        login(address);
      }
      //todo check if user present, sign a message then test the message backend side 

    },
    
   
  })
 
   return (
    <>
    <ChakraProvider theme={theme}>
      
      <Header registred = {registred}/>
     
      <Box pl={15}>
          <Routes>
              <Route path="/home" element = {<Index isConnecting={isConnecting}/>}/> 
              <Route path="/about" element = {<About />} />
              <Route path="/campaigns" element = {<CampaignsAvailable />} />
              <Route path="/partners" element = {<Partners />} />

              <Route path="/register"  >
                <Route index element = {<Register />} />
                <Route path="partner" element = {<PartnerRegistration login = {login}/>} />
                <Route path="member" element = {<MemberRegistration login = {login}/>} />
              </Route>

              <Route path="/user"> 
                <Route index element = {<User />} />
                <Route path="member" element = {<MemberComponent />} /> 
                <Route path="partner" element = {<PartnerComponent />} /> 
                <Route path="admin" element = {<Admin />} /> 
              </Route>

          </Routes>
         
        </Box>
    </ChakraProvider>
  </>
  )
}

export default App
