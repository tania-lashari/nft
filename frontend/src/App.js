import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import { contractabi, contractAddress,tokenabi, tokenAddress} from './constant';
import WalletConnectProvider from "@walletconnect/web3-provider";
import './App.css';

function App() {

  const [walletvalue, setWalletValue] = useState("Connect Wallet")
  const [account, setaccount] = useState();
  const [connected, setconnected] = useState(false);
  const [connectWallet, setConnectWallet] = useState("WalletConnect");
  const [showApprove, setshowApprove] = useState(true);
  const [showMint, setshowMint] = useState(false);
  let accountAd;
  let value;
 


   const loadWeb3 = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        console.log("Metamask is not installed, please install it on your browser to connect.");
        alert("Metamask is not installed, please install it on your browser to connect.");
      }
      if (isConnected === true) {
        let accounts = await getAccounts();
        // setAccount(accounts[0]);
        accountAd = accounts[0];
        setaccount(accounts[0])
        value= accountAd.substring(0, accountAd.length-25)+"...";

        setWalletValue(value);

        let accountDetails = null;
        window.ethereum.on("accountsChanged", function (accounts) {
          // setAccount(accounts[0]);
          accountAd = accounts[0];
          setaccount(accounts[0])
          value= accountAd.substring(0, accountAd.length-25)+"...";
           
          setWalletValue(value);
        });
      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
      // alert("Error while connecting metamask");
    }
  };


  const getAccounts = async () => {
    const web3 = window.web3;
    try {
      let accounts = await web3.eth.getAccounts();
      console.log(accounts);
      return accounts;
    } catch (error) {
      console.log("Error while fetching acounts: ", error);
      return null;
    }
  };

  // eslint-disable-next-line
  const isLockedAccount = async () => {
    try {
      let accounts = await getAccounts();
      if (accounts.length > 0) {
        console.log("Metamask is unlocked");
      } else {
        console.log("Metamask is locked");
      }
    } catch (error) {
      alert("Error while checking locked account");
    }
  };

  const walletconnect = async () => {
    let isConnected = false;
    try {
      
      console.log("This is   setErrorState(false);");
      
      const provider = new WalletConnectProvider({
        chainId: 56,
        rpc: {
          56: "https://bsc-dataseed.binance.org",
        },
      });

      
      await provider.enable();

      if (provider) {
        window.web3 = new Web3(provider);
        isConnected = true;
      } else {
        isConnected = false;
        setconnected(false);
        
        console.log("This is setErrorState(true)");
        }
      if (isConnected === true) {
        setconnected(true);
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        web3.eth.net.getId().then((netId) => {
          
          setWalletValue(accounts[0]); 
          setaccount(accounts[0]);
          setConnectWallet(accounts[0]);
          accountAd = accounts[0];
          

          switch (netId) {
            case 1:
              console.log("(accounts[0], 2)", (accounts[0], 2));
              console.log("This is mainnet");
              break;
            case 2:
              console.log("This is the deprecated Morden test network.");
              break;
            case 3:
              console.log("This is the ropsten test network.");
              break;
            default:
              console.log("(accounts[0], 2)", (accounts[0], 1));

           
          }
        });
        

        window.ethereum.on("accountsChanged", function (accounts) {
          
          web3.eth.net.getId().then((netId) => {
            switch (netId) {
              case 1:
                console.log("This is mainnet");
                break;
              case 2:
                console.log("This is the deprecated Morden test network.");
                break;
              case 3:
                console.log("This is the ropsten test network.");
                break;
              default:
                console.log("This is an unknown network.");
            }
          });
        });
      }
    } catch (error) {
      console.log("error", error);
      setconnected(false);
    }
  };

 
  
  const approveTokenss = async () => {
   try {
      // console.log("accountDetails", referral);
      const web3 = window.web3;
      let ccontract = new web3.eth.Contract(contractabi, contractAddress);
      let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);
      let contractPrice = await ccontract.methods.cost().call();

      let tokens = await tokencontract.methods
        .approve(contractAddress, 10000000000000)
        .send({
          from: account,
          gasLimit: 200000,
        })
        .on("transactionHash", async (hash) => {
          console.log("input", "Your transaction is pending");
         
        
        })
        .on("receipt", async (receipt) => {
          console.log("input", "Your transaction is confirmed", receipt);
          setshowApprove(false);
          setshowMint(true);
        })
        .on("error", async (error) => {
          console.log("input", "User denied transaction", error);
        });
      } catch (e) {
      console.log("error", e);
      console.log("error", e.mesage);
   
  }
  };

  const mintnft = async () => {
    try {
      // console.log("accountDetails", referral);
      const web3 = window.web3;
      let ccontract = new web3.eth.Contract(contractabi, contractAddress);
      let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);
      

      let tokens = await ccontract.methods
        .mint(account)
        .send({
          from: account,
          gasLimit: 2100000,
        })
        .on("transactionHash", async (hash) => {
          console.log("input", "Your transaction is pending");
          
        
        })
        .on("receipt", async (receipt) => {
          console.log("input", "Your transaction is confirmed", receipt);
          setshowMint(false);
          setshowApprove(true);
        })
        .on("error", async (error) => {
          console.log("input", "User denied transaction", error);
        });
      } catch (e) {
      console.log("error", e);
      console.log("error", e.mesage);
   
  }
  };
 
 
        
      
  useEffect(() => {
   
      
   
  }, []);
  return (
    <div>
    
      <div className="container">
        
        <div>
          <div className="content__button">
            <button onClick={loadWeb3} className="button--buy ">{walletvalue}</button>
          </div>
        </div>
        <br/>
       <div className="content__button">
           {showApprove? <button onClick={approveTokenss} className="button--buy">Approve Tokens</button>:null}
          {showMint?<button onClick={mintnft} className="button--buy">Mint</button>:null}
        </div>
  </div>
    </div>
  )
}

export default App
