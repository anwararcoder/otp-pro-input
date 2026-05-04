import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OTP Pro Input",
  description: "A high-performance, multi-framework OTP input component.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API Reference', link: '/api' },
        ]
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'React', link: '/frameworks/react' },
          { text: 'Vue 3', link: '/frameworks/vue' },
          { text: 'Vanilla JS', link: '/frameworks/vanilla' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/anwararcoder/otp-pro-input' }
    ]
  }
})
