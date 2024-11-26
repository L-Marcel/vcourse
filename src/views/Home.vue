<script setup lang="ts">
import AdminButton from '@/components/buttons/AdminButton.vue'
import ListItem from '../components/VideoCard.vue'
import { inject, onMounted, reactive, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import AddButton from '@/components/buttons/AddButton.vue'
import LogoutButton from '@/components/buttons/LogoutButton.vue'
import type { Video } from '@/utils/videos'
import { onBeforeRouteUpdate } from 'vue-router'

const $cookies = inject<VueCookies>('$cookies')
const authenticated = ref(false)
const videos = ref<Video[]>([])
const token = $cookies?.get('vcourse@token')

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

const onLogout = () => {
  authenticated.value = false
}

const getVideos = async () => {
  const response = await fetch('http://localhost:8080/videos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    return await response.json()
  } else {
    return []
  }
}

const removeVideo = (index: number) => {
  videos.value.splice(index, 1)
}

const update = async () => {
  authenticated.value = await isAuth()
  if (!authenticated.value) $cookies?.remove('vcourse@token')
  videos.value = await getVideos()
}

onMounted(update)
onBeforeRouteUpdate(update)
</script>

<template>
  <main class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-2">
      <div
        class="flex flex-col-reverse justify-start gap-2 md:flex-row md:justify-between md:items-center w-full"
      >
        <h1 class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300">
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">V</span>Course
        </h1>
        <LogoutButton v-on:logout="onLogout" v-show="authenticated" />
        <AdminButton v-show="!authenticated" />
      </div>
      <p class="text-sm md:text-base">
        O melhor curso gratuido de <span class="text-green-600 font-semibold">Vue.js</span> do
        <span class="text-green-600 font-semibold">Brasil</span> inteiro!
      </p>
      <hr class="max-w-[75%]" />
      <p class="hidden md:block font-light max-w-[75%]">
        A cada semana liberamos 5 aulas novas e completamente inovadoras para que você e seu time
        possa se manter atualizado sobre os recursos mais novos dessa incrível tecnologia, que é uma
        das melhores do mercado! E as aulas que ficarem obsoletas serão substituídas ou removidas
        periodicamente.
      </p>
      <p class="text-sm md:text-base font-light">Prezamos a qualidade e simplicidade.</p>
    </section>
    <section v-show="authenticated">
      <AddButton />
    </section>
    <section class="flex flex-col w-full min-h-full h-full">
      <ul class="flex flex-col w-full min-h-full h-full gap-4">
        <li v-for="(video, index) in videos" :key="video.id">
          <ListItem
            v-bind:id="video.id"
            v-bind:index="index"
            v-bind:youtube="video.youtube"
            v-bind:title="video.title"
            v-bind:duration="video.duration"
            v-bind:description="video.description"
            v-bind:created-at="new Date(video.createdAt)"
            v-bind:editable="authenticated"
            v-on:remove="removeVideo"
          />
        </li>
      </ul>
    </section>
  </main>
</template>
