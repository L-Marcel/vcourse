<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EditButton from './buttons/EditButton.vue'
import RemoveButton from './buttons/RemoveButton.vue'

const props = defineProps({
  editable: Boolean,
})
</script>

<template>
  <RouterLink
    tabindex="0"
    to="/"
    class="flex flex-col relative md:flex-row gap-3 bg-zinc-200 p-4 hover:bg-green-400 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500"
  >
    <div v-show="props.editable" class="absolute flex flex-row top-4 left-4">
      <EditButton />
      <RemoveButton />
    </div>
    <img
      src="https://img.youtube.com/vi/9DRY-aNPta0/hqdefault.jpg"
      class="object-cover min-w-[160px] max-w-[160px] w-[160px] min-h-[90px] max-h-[90px] h-[90px]"
    />
    <div class="flex flex-col gap-1">
      <h3
        class="font-medium text-xl bg-zinc-300 pr-1 w-min text-nowrap transition-colors duration-200 group-hover:bg-green-500 text-ellipsis overflow-hidden max-w-full"
      >
        <span
          class="bg-green-500 px-1 mr-1 inline-block h-full transition-colors duration-200 group-hover:bg-green-600"
          >0</span
        >Introdução ao Vue.js
      </h3>
      <p>Aprenda os conceitos básicos dessa tecnologia.</p>
      <div class="flex gap-2">
        <time class="font-extralight hidden md:block" datetime="2024-11-19 20:00">19/11/2024</time>
        <span class="font-extralight hidden md:block">|</span>
        <time class="font-thin">2 horas e 3 minutos</time>
      </div>
    </div>
  </RouterLink>
</template>
