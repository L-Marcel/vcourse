<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { videoSchema, type CreateVideoData } from '@/utils/videos'
import router from '@/router'
import { useRoute } from 'vue-router'
import BackButton from '@/components/buttons/BackButton.vue'
import SubmitButton from '@/components/buttons/SubmitButton.vue'
import Input from '@/components/Input.vue'
import { ZodError } from 'zod'

const $cookies = inject<VueCookies>('$cookies')

const loading = ref(true)
const route = useRoute()
const id = route.params.id
const token = $cookies?.get('vcourse@token')
const video = ref<CreateVideoData>({
  title: '',
  description: '',
  duration: 1,
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

const submit = async (e: Event) => {
  e.preventDefault()
  try {
    const data = videoSchema.parse(video.value);
    if (id) {
      const response = await fetch(`http://localhost:8080/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toString()
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        alert('Erro inesperado ao editar vídeo')
      }
    } else {
      const response = await fetch('http://localhost:8080/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toString()
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        alert('Erro inesperado ao registrar vídeo')
      }
    }
  } catch (e) {
    if (e instanceof ZodError) {
      alert('Erro inesperado')
      console.log(e)
    }
  };
}

onMounted(async () => {
  const authenticated = await isAuth()
  if (!authenticated) {
    router.replace('/401')
    $cookies?.remove('vcourse@token')
  } else if (id) {
    video.value = await getVideo()
    loading.value = false
  } else {
    loading.value = false
  }
})
</script>

<template>
  <main v-show="!loading" class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-4">
      <BackButton />
      <div class="flex flex-col gap-0 w-full">
        <h1 v-show="!id" class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300">
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Registrar</span>Vídeo
        </h1>
        <h1 v-show="id" class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300">
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Editar</span>Vídeo
        </h1>
      </div>
    </section>
    <section>
      <form v-on:submit="submit" class="flex flex-col gap-4 sm:max-w-[50%] md:max-w-[35%]">
        <Input v-model="video.title" placeholder="Título" required />
        <Input
          v-model="video.youtube"
          icon="io-lock-closed-sharp"
          placeholder="ID no Youtube"
          required
        />
        <!-- <Input
          v-model="video.duration"
          icon="io-lock-closed-sharp"
          placeholder="ID no Youtube"
          type="number"
          required
        /> -->
        <SubmitButton v-bind:text="id? 'Salvar':'Registrar'" />
      </form>
    </section>
  </main>
</template>
