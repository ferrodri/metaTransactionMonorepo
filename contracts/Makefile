-include .env

.PHONY: source .env

# This is the first private key of account from from the "make anvil" command
# Example on how to run this command: "make deploy-anvil contract=TesseractProxy", remember to first run "make anvil"
deploy-anvil :; forge script script/${contract}.s.sol:Deploy${contract} --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast -vvvv

# Example on how to run this command: "make deploy-mumbai contract=TesseractProxy"
deploy-mumbai :; forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${MUMBAI_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${POLYGON_API_KEY} -vvvv

deploy-polygon :; forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${POLYGON_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${POLYGON_API_KEY} -vvvv

deploy-all :; make deploy-${network} contract=Review
