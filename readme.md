# NFT demo project

## Getting started
### Set up ```.env```

```
API_URL=https://eth-ropsten.alchemyapi.io/v2/your-api-token
PRIVATE_KEY=your-wallet-private-key
PUBLIC_KEY=your-wallet-public-key
```

### Deploy contract (ropsten testnet)

```bash
npx hardhat run scripts/deploy.js --network ropsten
```

### Mint

```bash
node scripts/mint-nft.js
```