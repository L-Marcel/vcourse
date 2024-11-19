<template>
  <RouterLink
    tabindex="0"
    class="bg-zinc-200 inline-block w-fit pl-1 hover:bg-green-500 group transition-colors duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-green-500"
    to="/admin"
  >
    admin
    <span
      class="bg-green-500 inline-block h-full px-0.5 transition-colors duration-200 group-hover:bg-green-600"
      ><v-icon name="io-arrow-forward-sharp"
    /></span>
  </RouterLink>
</template>
