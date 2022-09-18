
const { ethers } = require("hardhat");

const PUBLIC_KEY = "0x77837AF661B188a73d46da412817643F20aB609F";

//const TOKEN_URI = "PUT YOUR META DATA URL HERE";

const contract = require("../artifacts/contracts/Nft.sol/Nft.json");
const contractAddress = "0xeB3dF8Fc1DCf7fB9d6F5F7AC11b5fdB4BC6Ad57f";

async function mint() {
    const myNFT = await ethers.getContractAt(contract.abi, contractAddress);
    const tx = await myNFT.mint(PUBLIC_KEY);
    const receipt = await tx.wait();
    console.log("The hash of the transaction: ", receipt.transactionHash);
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });