<script setup lang="ts">
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies')

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const logout = () => {
  $cookies?.remove('vcourse@token')
  emit('logout')
}
</script>

<template>
  <button
    tabindex="0"
    v-on:click="logout"
    class="inline-flex items-center gap-2 bg-zinc-200 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
  >
    <span>Sair</span>
    <span
      class="flex items-center justify-center bg-red-500 text-white rounded-full w-6 h-6 transition-transform duration-300 group-hover:scale-110"
    >
      <v-icon name="io-close-sharp" />
    </span>
  </button>
</template>
