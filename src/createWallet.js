//dependecias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//btc mainnet e testnet
const network = bitcoin.networks.testnet

//derivacao carteiras HD
const path = `m/49'/1'/0'/0`

//criando mnemonic para seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz carteria HD
let root = bip32.fromSeed(seed, network)

//criando a conta (par pvt-pub keys)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Criada")
console.log("Endereço:", btcAddress)
console.log("Chave Privada:", node.toWIF())
console.log("Seed:", mnemonic)