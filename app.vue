<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <NuxtLayout>
    <h1>New title</h1>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.dark {
  color-scheme: dark;
}

html,
body {
  height: 100vh;
  overflow: hidden;
  --uno: bg-base;
}
</style>
