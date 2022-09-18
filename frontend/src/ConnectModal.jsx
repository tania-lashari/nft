import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";

import cW from "./assets/cW.png";
import mM from "./assets/mM.png";



const ConnectModal = ({address,
  loadNFTs,
  walletconnect,
  loadWeb3, connectWallet, show, showmeta, showwallet, setShow, account, nfts, walletvalue}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (walletvalue !== 'Connect Wallet') {
      setIsOpen(false);
    }

  }, [walletvalue])

  return (
    <div>

      <div>
        {/* <AppButton title={address} onClick={toggle} /> */}
        <button onClick={toggle}> {walletvalue} </button>

      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggle}
        overlayClassName="request-modal-overlay"
        className="request-modal"
      >
        <div class="connect-modal">
          <button
            type="button"
            onClick={loadWeb3}
            class="modal--metamask"
          >
            <img className="w--180 " src={mM} alt="" />
            Metamask
            <div className="text">
              Connect to your MetaMask Wallet
            </div>
          </button>
          <button
            type="button"
            onClick={walletconnect}
            class="modal--metamask"
          >
            {" "}
            <img className="w--90 h--90" src={cW} alt="" /> WalletConnect
            <div className="text">
              Scan with WalletConnect to connect
            </div>
          </button>
        </div>
        {/* <div className="d-flex justify-content-center">
          <AppButton title="Cancel" onClick={toggle} />
        </div> */}
      </Modal>
    </div>
  );
};
export default ConnectModal;
