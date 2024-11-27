<script setup lang="ts">
const props = defineProps({
  error: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'io-person-sharp',
    validator(value: string, _) {
      return value.startsWith('io')
    },
  },
})
</script>

<template>
  <label tabindex="-1" class="flex flex-col gap-3 w-full">
    <div class="flex flex-row w-full bg-green-500 ring-green-600 focus-within:ring-2">
      <div class="flex justify-center items-center h-10 w-10 min-h-10 min-w-10">
        <v-icon v-bind:name="props.icon" />
      </div>
      <input
        autocomplete="off"
        v-bind:name="props.name"
        tabindex="0"
        class="bg-zinc-200 outline-none px-4 py-2 w-full"
        v-bind="$attrs"
      />
    </div>
    <p class="font-light" v-show="props.error">{{ props.error }}</p>
  </label>
</template>
