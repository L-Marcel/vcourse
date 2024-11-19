<template>
  <article
    tabindex="0"
    class="flex bg-zinc-200 p-4 hover:bg-green-400 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500"
  >
    <div class="flex flex-col gap-1">
      <h3
        class="font-medium text-xl bg-zinc-300 pr-1 w-min text-nowrap transition-colors duration-200 group-hover:bg-green-500"
      >
        <span
          class="bg-green-500 px-1 mr-1 inline-block h-full transition-colors duration-200 group-hover:bg-green-600"
          >0</span
        >Introdução ao Vue.js
      </h3>
      <p>Aprenda os conceitos básicos dessa tecnologia.</p>
      <div class="flex gap-2">
        <time class="font-extralight" datetime="2024-11-19 20:00">19/11/2024</time>
        <span class="font-extralight">|</span>
        <time class="font-thin">2 horas e 3 minutos</time>
      </div>
    </div>
  </article>
</template>
