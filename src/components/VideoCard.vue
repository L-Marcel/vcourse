<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EditButton from './buttons/EditButton.vue'
import RemoveButton from './buttons/RemoveButton.vue'
import { format, formatDuration } from 'date-fns'
import { pt } from 'date-fns/locale'

const props = defineProps({
  editable: {
    default: false,
    type: Boolean,
  },
  id: {
    type: Number,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

const formattedDate = format(props.createdAt, 'dd/MM/yyyy', { locale: pt })
const formattedDuration = formatDuration(
  {
    hours: Math.floor(props.duration / 60),
    minutes: props.duration % 60,
  },
  { locale: pt, delimiter: ' e ' },
)

const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()
</script>

<template>
  <RouterLink
    tabindex="0"
    v-bind:to="`/video/${props.id}`"
    class="flex flex-col relative md:flex-row gap-3 bg-zinc-200 p-4 hover:bg-green-400 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500"
  >
    <div v-show="props.editable" class="absolute flex flex-row top-4 left-4">
      <EditButton v-bind:id="props.id" />
      <RemoveButton v-on:removed="emit('remove', props.index)" v-bind:id="props.id" />
    </div>
    <img
      v-bind:src="`https://img.youtube.com/vi/${props.youtube}/hqdefault.jpg`"
      class="object-cover min-w-[160px] max-w-[160px] w-[160px] min-h-[90px] max-h-[90px] h-[90px]"
    />
    <div class="flex flex-col gap-1">
      <h3
        class="font-medium text-xl bg-zinc-300 pr-1 w-min text-nowrap transition-colors duration-200 group-hover:bg-green-500 text-ellipsis overflow-hidden max-w-full"
      >
        <span
          class="bg-green-500 px-1 mr-1 inline-block h-full transition-colors duration-200 group-hover:bg-green-600"
          >{{ props.index }}</span
        >{{ props.title }}
      </h3>
      <p>{{ props.description }}</p>
      <div class="flex gap-2">
        <time
          class="font-extralight hidden md:block"
          v-bind:datetime="props.createdAt.toString()"
          >{{ formattedDate }}</time
        >
        <span class="font-extralight hidden md:block">|</span>
        <time class="font-thin">{{ formattedDuration }}</time>
      </div>
    </div>
  </RouterLink>
</template>
