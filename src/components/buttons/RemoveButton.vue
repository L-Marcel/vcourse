<script setup lang="ts">
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies')

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'removed'): void
}>()

const remove = async () => {
  const token = $cookies?.get('vcourse@token')
  const response = await fetch(`http://localhost:8080/videos/${props.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) emit('removed')
}
</script>

<template>
  <button
    tabindex="0"
    class="inline-block w-fit hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-red-500 bg-red-500 h-full px-0.5 transition-colors duration-200 hover:bg-red-600"
    v-on:click="remove"
  >
    <v-icon name="io-trash-sharp" />
  </button>
</template>
