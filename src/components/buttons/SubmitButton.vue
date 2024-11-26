<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Enviar'
  }
});
</script>

<template>
  <button
    tabindex="0"
    class="bg-zinc-300 inline-block h-9 w-fit px-4 hover:bg-green-500 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500"
    type="submit"
  >
    {{ props.text }}
  </button>
</template>
