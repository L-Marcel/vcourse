<script setup lang="ts">
import BackButton from '@/components/buttons/BackButton.vue'
</script>

<template>
  <main class="p-8 min-h-screen flex flex-col gap-4">
    <section class="flex flex-col gap-2">
      <BackButton />
      <div
        class="flex flex-col-reverse justify-start gap-2 md:flex-row md:justify-between md:items-center w-full"
      >
        <h1 class="w-min text-nowrap pr-1 font-semibold text-2xl md:text-4xl bg-zinc-300">
          <span class="bg-green-500 px-1 mr-1 inline-block h-full">Erro</span>404
        </h1>
      </div>
      <p class="text-base md:text-xl">
        A página ou recurso que você está procurando
        <span class="text-green-600 font-semibold">não existe</span>.
      </p>
      <hr class="max-w-[75%]" />
      <p class="text-base md:text-xl">
        Pedimos <span class="text-green-600 font-semibold">desculpas</span> por qualquer
        incoveniente!
      </p>
    </section>
  </main>
</template>
