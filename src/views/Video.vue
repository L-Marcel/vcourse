<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '@/utils/videos'
import router from '@/router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import BackButton from '@/components/buttons/BackButton.vue'
import { format, formatDuration } from 'date-fns'
import { pt } from 'date-fns/locale'

const route = useRoute()
const id = route.params.id
const video = ref<Video>({
  id: 0,
  title: '',
  description: '',
  duration: 0,
  youtube: '',
  createdAt: '',
})

const formattedDate = ref('')
const formattedDuration = ref('')

const getVideo = async () => {
  const response = await fetch(`http://localhost:8080/videos/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    return await response.json()
  } else {
    router.replace('/404')
    return video.value
  }
}

const update = async () => {
  if (id) {
    video.value = await getVideo()
    formattedDate.value = format(video.value.createdAt, 'dd/MM/yyyy', { locale: pt })
    formattedDuration.value = formatDuration(
      {
        hours: Math.floor(video.value.duration / 60),
        minutes: video.value.duration % 60,
      },
      { locale: pt, delimiter: ' e ' },
    )
  } else {
    router.replace('/404')
  }
}

onMounted(update)
onBeforeRouteUpdate(update)
</script>

<template>
  <main class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-4">
      <BackButton />
      <iframe
        class="aspect-video shadow-md w-full rounded-xl overflow-hidden md:w-2/3 lg:w-1/2 bg-black"
        v-bind:src="`https://www.youtube.com/embed/${video.youtube}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </section>
    <section>
      <h1
        class="font-medium shadow-md rounded-r-lg rounded-tl-lg text-2xl bg-zinc-200 px-2 w-min text-nowrap transition-colors duration-200 group-hover:bg-green-500 text-ellipsis overflow-hidden max-w-full"
      >
        {{ video.title }}
      </h1>
      <div>
        <time
          v-bind:datetime="video.createdAt.toString()"
          class="bg-green-500 shadow-md rounded-b-lg px-2 mr-1 inline-block h-full transition-colors duration-200 group-hover:bg-green-600"
          >{{ formattedDate }}</time
        >
        <time class="hidden md:inline">{{ formattedDuration }}</time>
      </div>
    </section>
    <hr class="max-w-[75%] -mb-2" />
    <section>
      <p class="w-full md:max-w-[75%] text-wrap">
        {{ video.description }}
      </p>
    </section>
  </main>
</template>
