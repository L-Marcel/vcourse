<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue'
import SubmitButton from '@/components/buttons/SubmitButton.vue'
import Input from '@/components/Input.vue'
import router from '@/router'
import { inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies')

const error = ref<string>('')
const data = {
  email: '',
  password: '',
}

const submit = async (event: Event) => {
  event.preventDefault()
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const { accessToken: token } = await response.json()
    $cookies?.set('vcourse@token', token, '1d')
    router.push('/')
  } else {
    error.value = 'Credenciais inválidas!'
    const element = document.getElementsByName('email')[0]
    console.log(element)
    element?.focus()
  }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    data[target.name as keyof typeof data] = target.value
  }
}
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-white p-6"
  >
    <section class="flex flex-row gap-6 items-center mb-8">
      <BackButton />
      <div class="text-center">
        <h1
          class="text-xl sm:text-2xl md:text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-green-600 to-teal-500 text-transparent bg-clip-text"
        >
          Administração
        </h1>
      </div>
    </section>
    <section class="w-full flex flex-col items-center">
      <form
        autocomplete="off"
        v-on:submit="submit"
        class="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6"
      >
        <Input
          autofocus
          name="email"
          v-on:input="onInput"
          v-bind:value="data.email"
          placeholder="Administrador"
        />
        <Input
          name="password"
          v-on:input="onInput"
          v-bind:value="data.password"
          icon="io-lock-closed-sharp"
          placeholder="Senha"
          type="password"
          v-bind:error="error"
        />
        <SubmitButton
          text="Entrar"
          class="bg-green-500 font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        />
      </form>
    </section>
  </main>
</template>
