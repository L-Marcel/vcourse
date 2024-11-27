<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
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

type Errors = {
  [key in keyof CreateVideoData]: string
} & { new: boolean }
const errors = ref<Errors>({
  new: false,
  description: '',
  title: '',
  youtube: '',
  duration: '',
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
  const result = videoSchema.safeParse(video.value)
  if (result.success && id) {
    errors.value = {
      new: false,
      description: '',
      title: '',
      youtube: '',
      duration: '',
    }

    const response = await fetch(`http://localhost:8080/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...result.data,
        createdAt: new Date().toString(),
      }),
    })

    if (response.ok) {
      router.push('/')
    } else {
      alert('Erro inesperado ao editar vídeo')
    }
  } else if (result.success) {
    errors.value = {
      new: false,
      description: '',
      title: '',
      youtube: '',
      duration: '',
    }

    const response = await fetch('http://localhost:8080/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...result.data,
        createdAt: new Date().toString(),
      }),
    })

    if (response.ok) {
      router.push('/')
    } else {
      alert('Erro inesperado ao registrar vídeo')
    }
  } else {
    let _errors = { ...errors.value, new: true }
    result.error.errors.reverse().forEach((error) => {
      _errors = {
        ..._errors,
        [error.path[0] as keyof CreateVideoData]: error.message,
      }
    })
    errors.value = _errors
  }
}

const onInputDuration = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    const [hours, minutes] = target.value.split(':').map(Number)
    video.value.duration = Math.max(Math.min(hours * 60 + minutes, 480), 1)
    target.value = `${Math.floor(video.value.duration / 60)
      .toString()
      .padStart(2, '0')}:${(video.value.duration % 60).toString().padStart(2, '0')}`

    errors.value = {
      ...errors.value,
      new: false,
      [target.name]: '',
    }
  }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    video.value = {
      ...video.value,
      [target.name as keyof typeof video.value]: target.value,
    }

    errors.value = {
      ...errors.value,
      new: false,
      [target.name]: '',
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

watch(
  () => errors.value,
  () => {
    if (errors.value.new) {
      for (const field of Object.keys(errors.value) as [keyof typeof errors.value]) {
        if (field === 'new') continue
        else if (errors.value[field] !== '') {
          const element = document.getElementsByName(field)[0]
          console.log(element)
          element?.focus()
          break
        }
      }
    }
  },
)

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
      <form
        autocomplete="off"
        v-on:submit="submit"
        class="flex flex-col gap-4 sm:max-w-[50%] md:max-w-[35%]"
      >
        <Input
          name="title"
          autofocus
          autocapitalize="sentences"
          v-bind:error="errors.title"
          v-bind:value="video.title"
          v-on:input="onInput"
          placeholder="Título"
        />
        <Input
          name="youtube"
          v-bind:error="errors.youtube"
          v-bind:value="video.youtube"
          v-on:input="onInput"
          icon="io-key-sharp"
          placeholder="ID no Youtube"
        />
        <Input
          name="duration"
          v-bind:error="errors.duration"
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
        />
        <Textarea
          name="description"
          v-bind:error="errors.description"
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
