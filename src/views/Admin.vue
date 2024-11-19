<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue'
import LoginButton from '@/components/buttons/LoginButton.vue'
import Input from '@/components/Input.vue'
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
      <form class="flex flex-col gap-4 sm:max-w-[50%] md:max-w-[35%]">
        <Input placeholder="Administrador" />
        <Input icon="io-lock-closed-sharp" placeholder="Senha" type="password" />
        <LoginButton />
      </form>
    </section>
  </main>
</template>
