<template>
  <div class="prose max-w-none" v-html="compiled"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  text: String
})

const normalizeMarkdown = (md) => {
  if (!md) return ''
  // Falls der Text als JSON-String ankommt, parse ihn:
  try {
    if (md.startsWith('"') && md.endsWith('"')) {
      md = JSON.parse(md)
    }
  } catch {}
  // Doppelte (\\n) und einfache (\n) Backslashes zu echten \n machen:
  return md.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n')
}

const md = new MarkdownIt({
  html: false,     // kein HTML im Markdown erlauben (Sicherheits-Tipp!)
  linkify: true,   // Links automatisch erkennen
  typographer: true,
  breaks: false    // Kein Autobr, Markdown-Standard
})

const compiled = computed(() => md.render(normalizeMarkdown(props.text)))
</script>
