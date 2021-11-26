const { PUBLIC_KEY, API_URL, PRIVATE_KEY } = process.env;

async function main() {
    const contractAddress = "0xfAC5d0F656c5f22E2266cE31ca5C9dC5839F4651"
    const to = '0x54cad87cc112c80306c08af12de97d23bf37e12c'
    const signer = await ethers.getSigner(PUBLIC_KEY)
    const c = await ethers.getContractAt("NerioErc1155v2", contractAddress, signer)
 
    const tx = await c.mint(to, 2, 100, "0x00")
    console.log(tx)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
