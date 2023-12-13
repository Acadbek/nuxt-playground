<script setup lang="ts">
// @ts-expect-error missing type
import { Splitpanes, Pane } from "splitpanes";
const { x, y } = useMouse();

const isDragging = ref(false as boolean);
const leftSize = useLocalStorage("nuxt-playground-panel-left", 30);

const start = () => (isDragging.value = true);

const stop = (e: { size: number }[]) => {
  isDragging.value = false;
  leftSize.value = e[0].size;
};
</script>

<template>
  <Splitpanes h-full overflow-hidden @resize="start" @resized="stop">
    <Pane :size="leftSize">
      <article prose p4>
        <ContentDoc />
      </article>
    </Pane>
    <Pane>
      <ThePlayground :class="{ 'point-events-none': isDragging }" />
    </Pane>
  </Splitpanes>
</template>
