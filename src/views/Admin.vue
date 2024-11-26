<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue'
import SubmitButton from '@/components/buttons/SubmitButton.vue'
import Input from '@/components/Input.vue'
import router from '@/router'
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'

const $cookies = inject<VueCookies>('$cookies')

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
    alert('Credenciais inválidas')
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
  <main class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-4">
      <BackButton />
      <div class="flex flex-col gap-0 w-full">
        <h1 class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300">
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Admin</span>istração
        </h1>
      </div>
    </section>
    <section>
      <form v-on:submit="submit" class="flex flex-col gap-4 sm:max-w-[50%] md:max-w-[35%]">
        <Input
          name="email"
          v-on:input="onInput"
          v-bind:value="data.email"
          placeholder="Administrador"
          required
        />
        <Input
          name="password"
          v-on:input="onInput"
          v-bind:value="data.password"
          icon="io-lock-closed-sharp"
          placeholder="Senha"
          type="password"
          required
        />
        <SubmitButton text="Entrar" />
      </form>
    </section>
  </main>
</template>
