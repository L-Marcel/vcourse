<script setup lang="ts">
import { useAttrs } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'io-person-sharp',
    validator(value: string, _) {
      return value.startsWith('io')
    },
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex flex-col gap-1 w-full ring-green-600 focus-within:ring-2">
    <div class="flex flex-row w-full bg-green-500">
      <div class="flex justify-center items-center h-10 w-10 min-h-10 min-w-10">
        <v-icon v-bind:name="props.icon" />
      </div>
      <input
        class="bg-zinc-200 outline-none px-4 py-2 w-full"
        v-bind:type="props.type"
        v-bind:placeholder="props.placeholder"
        v-bind:value="props.modelValue"
        v-bind="attrs"
        v-on:input="
          (event) => {
            const target = event.target as HTMLInputElement | null
            if (target) {
              emit('update:modelValue', target.value)
            }
          }
        "
      />
    </div>
  </label>
</template>
