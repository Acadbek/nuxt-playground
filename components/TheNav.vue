<template>
  <div px3 py4 text-lg border-b border-base flex gap-2 items-center>
    <NuxtLink to="/" flex="~ gap-2 items-center" title="Nuxt Playground">
      <NuxtLogo h-1.3em mt--1.8 />
      <span text-xl>PLayground</span>
    </NuxtLink>
    <div flex-auto />
    <ColorSchemeToggle />
    <NuxtLink p2 rounded hover="bg-active" href="https://github.com/nuxt/learn.nuxt.com" target="_blank">
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </div>
</template>
