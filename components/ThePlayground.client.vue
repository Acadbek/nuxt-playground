<script setup lang="ts">
const iframe = ref<HTMLIFrameElement>()
const wcUrl = ref<string>()

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = shallowRef<{ message: string; }>()
const stream = ref<ReadableStream>()

async function startDevServer() {

  const rowFiles = import.meta.glob([
    '../templates/basic/*.*',
    '!**node_modules/**'
  ], {
    as: 'raw',
    eager: true,
  })

  const files = Object.fromEntries(
    Object.entries(rowFiles).map(([path, content]) => {
      return [path.replace('../templates/basic/', ''), {
        file: {
          contents: content
        }
      }]
    })
  )

  console.log(files);

  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => {
    status.value = 'ready'
    wcUrl.value = url
  });

  wc.on('error', (err) => {
    error.value = err
  })

  status.value = 'mount'

  await wc.mount(files)

  status.value = 'install'
  const installProcess = await wc.spawn('pnpm', ['install']);
  stream.value = installProcess.output
  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    error.value = {
      message: "Unable to run pnpm install exist as " + installExitCode
    }
    throw new Error('Unable to run pnpm install');
  }

  status.value = 'start'
  const devProcess = await wc.spawn('pnpm', ['run', 'dev']);
  stream.value = devProcess.output

  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      devProcess.kill()
    })
  }
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

onMounted(startDevServer)

</script>

<template>
  <div h-full w-full grid="~ rows-[2fr_1fr]" of-hidden>
    <iframe w-full h-full v-show="status === 'ready'" ref="iframe"></iframe>
    <div v-if="status !== 'ready'" flex="~ col items-center justify-center" capitalize>
      <div svg-spinners:8-dots-rotate></div>
      {{ status }}ing...
    </div>
    <TerminalOutput :stream="stream" h-full />
  </div>
</template>


