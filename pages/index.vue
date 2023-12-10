<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full overflow-hidden">
    <div>
      Content
      <div class="text-red">
        Hello {{ x }} {{ y }}
      </div>
    </div>
    <ThePlayground />
  </div>
</template>

<style scoped></style>
