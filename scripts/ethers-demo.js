const { PUBLIC_KEY } = process.env;

async function main() {
    const signer = await ethers.getSigner(PUBLIC_KEY)
    const contractAddress = "0xf3754140b8358e8881b10207acdb4b3c3e312387"
    const to = '0x982fA909FC7f5537b233922f8d7b116bD4F5cd7c'
    const c = await ethers.getContractAt("NerioDemoGameItems", contractAddress, signer)
    let bytes32 = ethers.utils.formatBytes32String("0x00")
    try {
        let res = await c.transfer(PUBLIC_KEY, to, 0, 128, bytes32)
        console.log(res)
    } catch (e) {
        console.log(bytes32)
        console.log(e)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
