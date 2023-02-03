import { Web3Modal, Web3Button } from "@web3modal/react"

export default function Header(){

return (
    <>
        <h1>RoyaltEth</h1>
        <Web3Button 
        icon="hide"
        balance="show"
        />
    </>
)
}