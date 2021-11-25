const { PUBLIC_KEY, API_URL, PRIVATE_KEY } = process.env;

async function main() {
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
    const web3 = createAlchemyWeb3(API_URL)
    const func = "setApprovalForAll(address,bool)"
    const address = "54cad87cc112c80306c08af12de97d23bf37e12c"
    const data = web3.utils.sha3(func).substr(0, 10) + web3.utils.padLeft(address, 64) + web3.utils.padLeft("1", 64)
    const tx = {
        from: PUBLIC_KEY,
        to: "0xc05e7267835a146c21d0b1caad507dd434c36ddc",
        data: data,
        gas: 500000
    }
    const sd = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)


    const d = await web3.eth.sendSignedTransaction(sd.rawTransaction)
    console.log(d, sd.rawTransaction)

    return
    const signer = await ethers.getSigner(PUBLIC_KEY)
    const contractAddress = "0xc05e7267835a146c21d0b1caad507dd434c36ddc"
    const to = '0x54cad87cc112c80306c08af12de97d23bf37e12c'
    const c = await ethers.getContractAt("NerioDemoGameItems", contractAddress, signer)
    const sr = await c.setApprovalForAll(to, true)
    console.log(sr)

    return
    
    let bytes32 = ethers.utils.formatBytes32String("0x00")
    try {
        let res = await c.transfer(PUBLIC_KEY, to, 0, 10, bytes32)
        console.log(res.hash)
    } catch (e) {
        console.log(bytes32)
        console.log(e)
    }
    let r = await c.balanceOf(PUBLIC_KEY, 0)
    console.log(r.toString())
    let r2 = await c.balanceOf(to, 0)
    console.log(r2.toString())
}


main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
