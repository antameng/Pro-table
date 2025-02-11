import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
