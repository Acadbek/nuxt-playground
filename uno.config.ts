import {defineConfig, presetUno, presetIcons, presetAttributify} from 'unocss'

export default defineConfig({
    shortcuts: {
        'border-base': 'border-gray-500 dark:border-gray-300',
        'bg-active': 'bg-gray:10',
    },
    presets: [
        presetUno(),
        presetIcons(),
        presetAttributify()
    ]
})