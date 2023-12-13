<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";

const iframe = ref<HTMLIFrameElement>();
const wcUrl = ref<string>();

type Status = "init" | "mount" | "install" | "start" | "ready" | "error";

const status = ref<Status>("init");
const error = shallowRef<{ message: string }>();
const stream = ref<ReadableStream>();

async function startDevServer() {
  const tree = globFilesToWebContainerFs(
    "../templates/basic/",
    import.meta.glob(["../templates/basic/**/*.*", "!**node_modules/**"], {
      as: "raw",
      eager: true,
    })
  );

  console.log(tree);

  const wc = await useWebContainer();
  wc.on("server-ready", (port, url) => {
    status.value = "ready";
    wcUrl.value = url;
  });

  wc.on("error", (err) => {
    error.value = err;
  });

  status.value = "mount";
  await wc.mount(tree);

  status.value = "install";
  const installProcess = await wc.spawn("npm", ["install"]);
  stream.value = installProcess.output;
  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    error.value = {
      message: "Unable to run npm install exist as " + installExitCode,
    };
    throw new Error("Unable to run npm install");
  }

  status.value = "start";
  const devProcess = await wc.spawn("npm", ["run", "dev"]);
  stream.value = devProcess.output;

  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      devProcess.kill();
    });
  }
}

watchEffect(() => {
  if (iframe.value && wcUrl.value) iframe.value.src = wcUrl.value;
});

onMounted(startDevServer);
</script>

<template>
  <Splitpanes h-full w-full of-hidden horizontal>
    <Pane> [Editor] </Pane>
    <Pane>
      <iframe w-full h-full v-show="status === 'ready'" ref="iframe"></iframe>
    </Pane>
    <Pane>
      <div
        v-if="status !== 'ready'"
        flex="~ col items-center justify-center"
        capitalize
      >
        <div svg-spinners:8-dots-rotate></div>
        {{ status }}ing...
      </div>
    </Pane>
    <Pane>
      <TerminalOutput :stream="stream" h-full />
    </Pane>
  </Splitpanes>
</template>


