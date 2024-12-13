<template>
  <RouterLink
    tabindex="0"
    class="inline-flex w-fit items-center gap-2 bg-zinc-200 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
    to="/register"
  >
    <span
      class="flex items-center justify-center bg-green-500 text-white rounded-full w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
    >
      <v-icon name="io-add-sharp" />
    </span>
    <span>Adicionar</span>
  </RouterLink>
</template>
