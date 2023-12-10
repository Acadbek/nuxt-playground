<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full overflow-hidden">
    <article prose border-r border-base p4>
      <ContentDoc />
    </article>
    <ThePlayground />
  </div>
</template>

<style scoped></style>
