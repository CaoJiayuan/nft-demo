const { PUBLIC_KEY } = process.env;

async function main() {
    const signer = await ethers.getSigner(PUBLIC_KEY)
    const contractAddress = "0xa193615d42c7ece911b2bb3aa0447c9050aa19c5"
    const to = '0x54cad87cc112c80306c08af12de97d23bf37e12c'
    const c = await ethers.getContractAt("NerioDemoGameItems", contractAddress, signer)
    // const sr = await c.setApprovalForAll(to, true)
    
    let bytes32 = ethers.utils.formatBytes32String("0x00")
    try {
        let res = await c.transfer(PUBLIC_KEY, to, 0, 128, bytes32)
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
