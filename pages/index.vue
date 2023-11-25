<script setup lang="ts">
const { x, y } = useMouse()
const color = useColorMode()

const changeMode = () => {
    color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <div class="text-red">
        Hello {{ x }} {{ y }}

        <button @click="changeMode">{{ $colorMode.value }}</button>
    </div>
</template>


<style scoped></style>