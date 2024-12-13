<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Enviar',
  },
})
</script>

<template>
  <button
    tabindex="0"
    class="flex items-center justify-center h-10 px-6 bg-green-500 hover:bg-green-600 text-gray-800 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-4 ring-green-500"
    type="submit"
  >
    {{ props.text }}
  </button>
</template>
