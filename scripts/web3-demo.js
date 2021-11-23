require("dotenv").config()
const API_URL = process.env.RINKEBY_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

// web3.eth.getBalance(PUBLIC_KEY).then(console.log)

const contract = require("../artifacts/contracts/erc1155.sol/NerioDemoGameItems.json")
const contractAddress = "0xf3754140b8358e8881b10207acdb4b3c3e312387"

const contractInstance = new web3.eth.Contract(contract.abi, contractAddress, {
    from: PUBLIC_KEY
})
const to = '0x7D99C8f344eE96A0e8aCDA686874AfC7A199bd2F'
contractInstance.methods.transfer(PUBLIC_KEY, to, 0, 20, '0x0').call({ from: PUBLIC_KEY, gas: 500000},(e, r) => {
    console.log(e, r)
})
// const txABI = contractInstance.methods.transfer(PUBLIC_KEY, to, 0, 20, '0x0').encodeABI()


// const tx = {
//     from: PUBLIC_KEY,
//     to: to,
//     gas: 500000,
//     data: txABI,
// }

// const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
// signPromise
//     .then((signedTx) => {
//         web3.eth.sendSignedTransaction(
//             signedTx.rawTransaction,
//             function (err, hash) {
//                 if (!err) {
//                     console.log(
//                         "The hash of your transaction is:",
//                         hash,
//                         "\nCheck Alchemy's Mempool to view the status of your transaction!"
//                     )
//                     contractInstance.methods.balanceOf(PUBLIC_KEY, 0).call((err, res) => {
//                         console.log('balanceOf', PUBLIC_KEY, res)
//                     })
//                     contractInstance.methods.balanceOf(to, 0).call((err, res) => {
//                         console.log('balanceOf', to, res)
//                     })
//                 } else {
//                     console.log(
//                         "Something went wrong when submitting your transaction:",
//                         err
//                     )
//                 }
//             }
//         )

//     })
//     .catch((err) => {
//         console.log("Promise failed:", err)
//     })

