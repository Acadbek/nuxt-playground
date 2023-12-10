import {
  defineConfig,
  presetTypography,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetUno,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray-200 dark:border-gray-800',
    'bg-active': 'bg-gray:dex10',
    'bg-base': 'bg-white dark:bg-[#020420]'
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        'sans': 'DM Sans',
        'mono': 'DM Mono'
      }
    }),
    presetTypography()
  ],
  transformers: [
    transformerDirectives()
  ]
})
