<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '@/utils/videos'
import router from '@/router'
import { useRoute } from 'vue-router'

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

onMounted(async () => {
  if (id) {
    video.value = await getVideo()
  } else {
    router.replace('/404')
  }
})
</script>

<template>
  <main class="p-8 min-h-screen flex flex-col gap-4">
    <h1>Vídeo page</h1>
    <p>
      {{ id }}
    </p>
    <p class="text-sm md:text-base font-light">
      {{ JSON.stringify(video) }}
    </p>
  </main>
</template>
