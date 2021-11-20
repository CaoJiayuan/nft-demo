async function main() {
    const Erc1155 = await ethers.getContractFactory("NerioDemoGameItems")

    // Start deployment, returning a promise that resolves to a contract object
    const token = await Erc1155.deploy()
    console.log("Contract deployed to address:", token.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
