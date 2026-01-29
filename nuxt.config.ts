// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',  // ← AÑADIDO: Indica que el código está en la carpeta app/
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@tresjs/nuxt'],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true
  },
  app: {
    head: {
      title: 'LABAIG®',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'data:,' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'data:,' }
      ]
    }
  }
})