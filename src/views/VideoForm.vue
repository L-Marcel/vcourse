<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { videoSchema, type CreateVideoData } from '@/utils/videos'
import router from '@/router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import BackButton from '@/components/buttons/BackButton.vue'
import SubmitButton from '@/components/buttons/SubmitButton.vue'
import Input from '@/components/Input.vue'
import { ZodError } from 'zod'
import Textarea from '@/components/Textarea.vue'

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

const submit = async (event: Event) => {
  event.preventDefault()
  try {
    const data = videoSchema.parse(video.value)
    if (id) {
      const response = await fetch(`http://localhost:8080/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toString(),
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
          createdAt: new Date().toString(),
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
      // [TODO] Show error messages
    }
  }
}

const onInputDuration = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    const [hours, minutes] = target.value.split(':').map(Number)
    video.value.duration = Math.max(Math.min(hours * 60 + minutes, 480), 0)
    target.value = `${Math.floor(video.value.duration / 60)
      .toString()
      .padStart(2, '0')}:${(video.value.duration % 60).toString().padStart(2, '0')}`
  }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    video.value = {
      ...video.value,
      [target.name as keyof typeof video.value]: target.value,
    }
  }
}

const update = async () => {
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
}

onMounted(update)
onBeforeRouteUpdate(update)
</script>

<template>
  <main v-show="!loading" class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-4">
      <BackButton />
      <div class="flex flex-col gap-0 w-full">
        <h1
          v-show="!id"
          class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300"
        >
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Registrar</span>Vídeo
        </h1>
        <h1
          v-show="id"
          class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300"
        >
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Editar</span>Vídeo
        </h1>
      </div>
    </section>
    <section>
      <form v-on:submit="submit" class="flex flex-col gap-4 sm:max-w-[50%] md:max-w-[35%]">
        <Input
          name="title"
          v-bind:value="video.title"
          v-on:input="onInput"
          placeholder="Título"
          required
        />
        <Input
          name="youtube"
          v-bind:value="video.youtube"
          v-on:input="onInput"
          icon="io-key-sharp"
          placeholder="ID no Youtube"
          required
        />
        <Input
          v-bind:value="`${Math.floor(video.duration / 60)
            .toString()
            .padStart(2, '0')}:${(video.duration % 60).toString().padStart(2, '0')}`"
          v-on:input="onInputDuration"
          v-on:change="onInputDuration"
          v-on:keyup="onInputDuration"
          v-on:keydown="onInputDuration"
          v-on:keypress="onInputDuration"
          v-on:blur="onInputDuration"
          type="time"
          step="60"
          icon="io-time-sharp"
          required
        />
        <Textarea
          name="description"
          v-bind:value="video.description"
          v-on:input="onInput"
          class="h-44 resize-none"
          maxlength="360"
          icon="io-clipboard-sharp"
          placeholder="Descrição"
        />
        <SubmitButton v-bind:text="id ? 'Salvar' : 'Registrar'" />
      </form>
    </section>
  </main>
</template>
