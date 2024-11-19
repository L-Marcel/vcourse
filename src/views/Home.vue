<script setup lang="ts">
import ListItem from '../components/ListItem.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import LoginButton from '@/components/LoginButton.vue'
import BackButton from '@/components/BackButton.vue'
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
        <LoginButton />
        <!-- <LogoutButton /> -->
        <!-- <BackButton /> -->
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
    <section class="flex flex-col w-full min-h-full h-full gap-4">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </section>
  </main>
</template>
