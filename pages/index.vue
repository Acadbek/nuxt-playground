<script setup lang="ts">
const { x, y } = useMouse()
const color = useColorMode()

function changeMode() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full overflow-hidden">
    <div>
      Content
      <div class="text-red">
        Hello {{ x }} {{ y }}

        <button @click="changeMode">
          {{ $colorMode.value }}
        </button>
      </div>
    </div>
    <ThePlayground />
  </div>
</template>

<style scoped></style>
