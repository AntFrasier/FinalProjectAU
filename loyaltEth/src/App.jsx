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
import Admin from "./pages/Admin";



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

  async function getSigneMessage(userAddress) {
    const nonce = await axios.get(backendUrl + `/user/nonce/${userAddress}`)
    console.log("nonce : ", nonce.data.data)
    return await signMessageAsync({ message :`Login to LoyaltEth/${userAddress}/${nonce.data.data}`});
  }

  async function login(userAddress) {
    try {
      const userSignature = await getSigneMessage(userAddress)
      console.log("userSignature", userSignature)
      const response = await axios.post(backendUrl + "/login/" , {
        address : userAddress,
        signature :userSignature
      }).then( (response) => {
        console.log ("response from the login backend :",response);
        if (response.status == 200) {
            let user = response.data.data;
            localStorage.setItem("connectedUser", JSON.stringify(user))
            setRegistred(true);
            setConnectedUser(user);
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

 

  const account = useAccount({
    
    onDisconnect() { //BUG this is not trigger some times .... why ??????? It seems that if i save app.jsx and not reload the page it is not triger
      console.log('****************************Disconnected********************************');
      navigate("/home");
      setRegistred(false);
      //todo remove token front and back
      localStorage.removeItem("connectedUser");
   },
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      if (isReconnected) {
        setConnectedUser(JSON.parse( localStorage.getItem("connectedUser")));
      } else {
        login(address);
      }
      //todo check if user present, sign a message then test the message backend side 

    },
    
   
  })
  // const isDeconnected = useAccount( {
  //   onDisconnect() { //BUG this is not trigger some times .... why ???????
  //     console.log('****************************Disconnected********************************');
  //     navigate("/home");
  //     setRegistred(false);
  //     //todo remove token front and back
  //     localStorage.removeItem("user");


  //   },
  // })

  useEffect( () => {
    console.log("****************************** connection status changed :", account.status); //the disconnected status doesnt appears some times that wired ....
   
  
  },[account])

  useEffect( () => {
    console.log("user changed", connectedUser);
  }, [connectedUser])

   return (
    <>
    <ChakraProvider theme={theme}>
      
      <Header />
     
      <Box pl={15}>
          <Routes>
              <Route path="/home" element = {<Index registred={registred}/>}/> 
              <Route path="/about" element = {<About />} />
              <Route path="/partners" element = {<Partners backendUrl={backendUrl}/>} />

              <Route path="/register"  >
                <Route index element = {<Register />} />
                <Route path="partner" element = {<PartnerRegistration backendUrl={backendUrl}/>} />
                <Route path="member" element = {<MemberRegistration backendUrl={backendUrl}/>} />
              </Route>

              <Route path="/user"> 
                <Route index element = {<User connectedUser={connectedUser}/>} />
                <Route path="member" element = {<MemberComponent connectedUser={connectedUser} />} /> 
                <Route path="partner" element = {<PartnerComponent connectedUser={connectedUser} />} /> 
                <Route path="admin" element = {<Admin connectedUser={connectedUser} backendUrl={backendUrl}/>} /> 
              </Route>

          </Routes>
         
        </Box>
    </ChakraProvider>
  </>
  )
}

export default App
