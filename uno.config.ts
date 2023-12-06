import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray-500 dark:border-gray-300',
    'bg-active': 'bg-gray:dex10',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
