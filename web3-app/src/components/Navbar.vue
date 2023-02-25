<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <button
              @click="isOpen = !isOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>

              <svg
                v-if="!isOpen"
                class="h-6 w-6"
                :class="isOpen ? 'hidden' : 'block'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                v-else
                class="h-6 w-6"
                :class="isOpen ? 'block' : 'hidden'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="@/assets/era-logo.png"
              alt="SolidityTips.com logo"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="@/assets/era-logo.png"
              alt="SolidityTips.com logo"
            />
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <router-link
              :to="{ name: 'Home' }"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >Greeter</router-link
            >

            <router-link
              :to="{ name: 'Token' }"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >ERC20 Token</router-link
            >
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <wallet-connect />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="isOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link
          :to="{ name: 'Home' }"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >Greeter</router-link
        >

        <router-link
          :to="{ name: 'Token' }"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >ERC20 Token</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// import { useWalletStore } from '../stores/wallet'
import WalletConnect from "./WalletConnect.vue";

export default defineComponent({
  components: { WalletConnect },
});
</script>
