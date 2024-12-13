<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    tabindex="0"
    class="inline-block rounded-tl-lg w-fit hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500 bg-green-500 h-full px-0.5 transition-colors duration-200 hover:bg-green-600"
    v-bind:to="`/edit/${props.id}`"
  >
    <v-icon name="io-pencil" />
  </RouterLink>
</template>
