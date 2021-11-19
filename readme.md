# NFT demo project

## Getting started
### Set up ```.env```

```
API_URL=https://eth-ropsten.alchemyapi.io/v2/your-api-token
PRIVATE_KEY=your-wallet-private-key
PUBLIC_KEY=your-wallet-public-key
```

### Deploy contract (ropsten testnet)

* tweak some variables
* run ```npx hardhat run scripts/deploy.js --network ropsten```


### Mint

* upload your artfact to ipfs ([Pinata](https://app.pinata.cloud/pinmanager))
* upload ntf-meta.json to ipfs
* tweak some variables
* run ```node scripts/mint-nft.js```
