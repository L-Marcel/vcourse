<template>
    <div>
      <section class="p-6 bg-gradient-to-r from-green-500 to-teal-600  shadow-lg text-white space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <span class="bg-white text-green-600 px-3 py-1 rounded-md shadow-sm">V</span>Course
          </h1>
          <slot name="buttons"></slot>
        </div>
        <p class="text-base md:text-lg font-medium bg-white bg-opacity-20 p-4 rounded-md shadow-md">
          Domine <span class="text-yellow-300 font-semibold">Vue.js</span> com um curso prático e direto ao ponto. Desafios reais, conteúdos atualizados e um foco em transformar sua carreira. Prepare-se para se destacar! Torne-se especialista em Vue.js com ferramentas e conhecimentos essenciais para criar projetos incríveis e superar desafios.
        </p>
      </section>
    </div>
  </template>
  