<script setup lang="ts">
const colorMode = useColorMode()

const toggleMode = () => colorMode.value = colorMode.value == 'light' ? 'dark' : 'light'
</script>

<template>
    <button @click="toggleMode" p-2 rounded hover:bg-active>
        <div i-carbon-moon dark:i-carbon-sun />
    </button>
</template>

