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
    class="bg-zinc-200 inline-block w-fit pl-1 hover:bg-red-500 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-red-500"
  >
    sair
    <span
      class="bg-red-500 inline-block h-full px-0.5 transition-colors duration-200 group-hover:bg-red-600"
    >
      <v-icon name="io-close-sharp" />
    </span>
  </button>
</template>
