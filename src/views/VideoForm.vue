<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import type { CreateVideoData } from '@/utils/videos'
import router from '@/router'
import { useRoute } from 'vue-router'

const $cookies = inject<VueCookies>('$cookies')

const loading = ref(true)
const route = useRoute()
const id = route.params.id
const token = $cookies?.get('vcourse@token')
const video = ref<CreateVideoData>({
  title: '',
  description: '',
  duration: 0,
  youtube: '',
})

const isAuth = async () => {
  const response = await fetch('http://localhost:8080/users/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.ok
}

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
  const authenticated = await isAuth()
  if (!authenticated) {
    router.replace('/401')
    $cookies?.remove('vcourse@token')
  } else if (id) {
    video.value = await getVideo()
    loading.value = false
  }
})
</script>

<template>
  <main v-show="!loading" class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-2">
      <h1>Form page</h1>
      <p>
        {{ id }}
      </p>
      <p class="text-sm md:text-base font-light">
        {{ JSON.stringify(video) }}
      </p>
    </section>
    <section class="flex flex-col w-full min-h-full h-full"></section>
  </main>
</template>
