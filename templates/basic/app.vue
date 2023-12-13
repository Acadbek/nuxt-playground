<script setup>
if (process.client) {
  window.addEventListener("message", (e) => {
    console.log("got message from wc", e);
  });
}
</script>

<template>
  <div>Hello Nuxt</div>
  <h1>bla bla bla bla</h1>
</template>
