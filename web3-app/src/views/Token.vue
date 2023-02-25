<template>
  <div class="text-center pt-12 mx-auto max-w-xl">
    <h1 class="text-2xl mb-8">Interact with ERC20 token</h1>
    <div v-if="walletStore.address != ''" class="flex flex-col space-y-4">
      <p>Your wallet address is: {{ walletStore.acc_short }}</p>
      <p>Your balance is: {{ balance }}</p>
      <button
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        @click="checkBalance"
      >
        {{ btnRead }}
      </button>
      <hr />
      <h2 class="text-xl font-bold my-8">Transfer tokens</h2>
      <input
        class="border border-gray-200 px-4 py-2"
        placeholder="0x destination wallet"
        type="text"
        v-model="destinationAccount"
      />
      <input
        class="border border-gray-200 px-4 py-2"
        placeholder="amount"
        type="text"
        v-model="amount"
      />
      <div class="flex flex-row space-x-2 mx-auto">
        <button
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          @click="transfer"
        >
          {{ btnUpdate }}
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="mint"
        >
          {{ btnMint }}
        </button>
      </div>
    </div>
    <p v-else class="text-red-600 font-medium">
      You've not connected your wallet yet
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Contract, Provider, Web3Provider, utils } from "zksync-web3";
import * as ethers from "ethers";
import * as Artifact from "../../../cli-demo/artifacts-zk/contracts/zkToken.sol/zkToken.json";

import { useWalletStore } from "../stores/wallet";
const ERC20_ADDRESS = "0xEf3a536f585f798b51D52150dFFF921a9758a4Dc";

const walletStore = useWalletStore();

let balance = ref("0");
const btnUpdate = ref("Transfer tokens");
const btnMint = ref("Mint tokens");

const btnRead = ref("Get Balance");
const destinationAccount = ref("");
const amount = ref("");

const checkBalance = async () => {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  // @ts-ignore
  const erc20Contract = new Contract(ERC20_ADDRESS, Artifact.abi, provider);
  try {
    btnRead.value = "...";
    const res = await erc20Contract.balanceOf(walletStore.address);
    console.log("res :>> ", res);
    balance.value = res.toString();
    console.log("balance :>> ", balance);
    btnRead.value = "Get Balance";
  } catch (error) {
    console.error(error);
    btnRead.value = "Get Balance";
  }
};

const transfer = async () => {
  const erc20Contract = new Contract(
    ERC20_ADDRESS,
    Artifact.abi,
    // @ts-ignore
    new Web3Provider(window.ethereum).getSigner()
  );
  try {
    btnUpdate.value = "...";
    const amountFormatted = ethers.utils.parseUnits(amount.value, 18);

    const tx = await erc20Contract.transfer(
      destinationAccount.value,
      amountFormatted
    );
    console.log("tx hash is :>> ", tx.hash);
    await tx.wait();
    btnUpdate.value = "Transfer";

    checkBalance();
    amount.value = "";
    destinationAccount.value = "";
  } catch (error) {
    console.error(error);
    btnUpdate.value = "Transfer";
  }
};

const mint = async () => {
  const erc20Contract = new Contract(
    ERC20_ADDRESS,
    Artifact.abi,
    // @ts-ignore
    new Web3Provider(window.ethereum).getSigner()
  );
  try {
    btnMint.value = "...";
    const amountFormatted = ethers.utils.parseUnits(amount.value, 18);

    const tx = await erc20Contract.mint(
      destinationAccount.value,
      amountFormatted
    );
    console.log("tx hash is :>> ", tx.hash);
    await tx.wait();
    btnMint.value = "Mint";
    amount.value = "";
    destinationAccount.value = "";
  } catch (error) {
    console.error(error);
    btnMint.value = "Mint";
  }
};
</script>
