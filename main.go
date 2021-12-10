package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"math/big"
	"nft-demo/contracts"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)

const ChainId = 3

func main() {
	godotenv.Load()
	flag.Parse()
	conn, err := ethclient.Dial("ws://127.0.0.1:8546")
	// conn, err := ethclient.Dial("https://rpcpeg.compverse.io")
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}
	// account := common.HexToAddress(os.Getenv("PUBLIC_KEY"))

	fmt.Println(flag.Args())

	if len(flag.Args()) > 0 {
		switch flag.Arg(0) {
		case "listen":
			subscribeEvent(conn)
		case "mint":
			mint(conn)
		case "deploy":
			deploy(conn)
		case "n":
			fmt.Println(conn.BlockNumber(context.Background()))
		}
	}
}

func subscribeEvent(conn *ethclient.Client) {
	addr := common.HexToAddress("0x8C9E18930c41ABbD9F5dF3a58053EBa25434EF19")
	contractAbi, e := abi.JSON(strings.NewReader(contracts.NerioErc1155v2ABI))
	if e != nil {
		log.Fatal(e)
	}
	query := ethereum.FilterQuery{
		Addresses: []common.Address{addr},
	}
	logs := make(chan types.Log)
	sub, err := conn.SubscribeFilterLogs(context.Background(), query, logs)
	if err != nil {
		log.Fatal(err)
	}
	log.Print("listening contract event")

	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logs:
			d, e := contractAbi.Unpack("TransferSingle", vLog.Data)
			tx, _, e := conn.TransactionByHash(context.Background(), vLog.TxHash)
			if e == nil {
				fmt.Println(tx.To().Hex())
			}
			fmt.Println(d, e, vLog.Address.Hex())
		}
	}
}

func deploy(conn *ethclient.Client) {
	pk := os.Getenv("PRIVATE_KEY")

	opt := NewKeyTransactor(conn, pk)

	fmt.Println(contracts.DeployNerioErc1155v2(opt, conn))
}

func mint(conn *ethclient.Client) {
	account := common.HexToAddress(os.Getenv("PUBLIC_KEY"))

	pk := os.Getenv("PRIVATE_KEY")

	erc1155 := getContarct(conn)

	opt := NewKeyTransactor(conn, pk)

	token := big.NewInt(3)

	tx, e := erc1155.Mint(opt, account, token, big.NewInt(1), nil)
	if e != nil {
		log.Fatal(e)
	}
	fmt.Println("tx", tx.Hash())
}

func getContarct(conn *ethclient.Client) *contracts.NerioErc1155v2 {
	addr := common.HexToAddress("0x8C9E18930c41ABbD9F5dF3a58053EBa25434EF19")

	erc1155, e := contracts.NewNerioErc1155v2(addr, conn)
	if e != nil {
		log.Fatal(e)
	}

	return erc1155
}

func demo1() {
	pk := os.Getenv("ACCOUNT_PRIVATE_KEY")
	// 连接本地节点
	conn, err := ethclient.Dial("http://127.0.0.1:8545")
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}

	addr := common.HexToAddress("0xfAC5d0F656c5f22E2266cE31ca5C9dC5839F4651")
	account := common.HexToAddress("0x54cad87cc112c80306c08af12de97d23bf37e12c")
	to := common.HexToAddress("0x982fA909FC7f5537b233922f8d7b116bD4F5cd7c")

	erc1155, e := contracts.NewNerioErc1155v2(addr, conn)
	if e != nil {
		log.Fatal(e)
	}

	key, e := crypto.HexToECDSA(pk)
	if e != nil {
		log.Fatal(e)
	}
	gasPrice, err := conn.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err, "gas err")
	}

	// 绑定pk
	opt, e := bind.NewKeyedTransactorWithChainID(key, big.NewInt(4))
	if e != nil {
		log.Fatal(e)
	}
	fmt.Println(opt)
	opt.GasLimit = 500000
	opt.GasPrice = gasPrice

	// 发送token
	tx, e := erc1155.SafeTransferFrom(opt, account, to, big.NewInt(2), big.NewInt(2), nil)
	if e != nil {
		log.Fatal(e)
	}

	fmt.Println("tx", tx.Hash())

	fmt.Println(erc1155.Uri(&bind.CallOpts{}, big.NewInt(0)))
	fmt.Println(erc1155.BalanceOf(&bind.CallOpts{}, account, big.NewInt(2)))
}

func NewKeyTransactor(conn *ethclient.Client, pk string) *bind.TransactOpts {
	key, e := crypto.HexToECDSA(pk)
	if e != nil {
		log.Fatal(e)
	}
	gasPrice, err := conn.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err, " gas err")
	}

	// 绑定pk
	opt, e := bind.NewKeyedTransactorWithChainID(key, big.NewInt(ChainId))
	if e != nil {
		log.Fatal(e)
	}
	opt.GasPrice = gasPrice

	return opt
}
