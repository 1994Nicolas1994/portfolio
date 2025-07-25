<template>
<header class="p-4 bg-secondary-500 text-white font-bold fixed w-screen z-50 flex items-center justify-between">
  <!-- Desktop-Nav -->
  <nav class="hidden lg:flex gap-4">
    <a
      v-for="block in blockNav"
      :key="block.id"
      :href="'#' + block.id"
      :class="[
        'transition hover:text-secondary-1000',
        currentSection === block.id ? 'text-secondary-800' : ''
      ]"
      @click="handleNavClick(block.id)"
    >
      {{ block.label }}
    </a>
  </nav>

  <!-- Hamburger für Mobile -->
  <button
  class="lg:hidden ml-auto pr-2 focus:outline-none"
  @click="showMobileNav = !showMobileNav"
  aria-label="Menü öffnen"
>
  <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
</button>

  <!-- Mobile Offcanvas -->
  <transition name="fade">
    <nav
      v-if="showMobileNav"
      class="fixed inset-0 bg-secondary-900/80 flex flex-col items-center justify-center gap-6 text-2xl z-50 lg:hidden"
      @click.self="showMobileNav = false"
    >
      <button
        class="absolute top-6 right-8 text-white text-4xl"
        @click="showMobileNav = false"
      >
        ✖
      </button>
      <a
        v-for="block in blockNav"
        :key="block.id"
        :href="'#' + block.id"
        :class="[
          'underline hover:no-underline',
          currentSection === block.id ? 'text-white underline' : ''
        ]"
        @click="scrollToAnchor(block.id); showMobileNav = false"
      >
        {{ block.label }}
      </a>
    </nav>
  </transition>
</header>

<main class="pt-14 lg:pt-14">
  <div v-if="pending" class="w-full flex items-center justify-center py-32">
    <span class="text-xl font-semibold animate-pulse">Lädt…</span>
  </div>
  <template v-else>
    <component
      v-for="(block, index) in content"
      :is="resolveComponent(block.__component)"
      :key="index"
      :data="block"
      :id="blockNav.find(b => b && b.label === block.navTitle)?.id"
    />
    <div id="kontakt">
      <ContactForm />
    </div>
  </template>
</main>

<footer class="p-4 bg-secondary-500 text-white">
  Nicolas Michel | Schwarztorstrasse 105 3007 Bern | © 2025 
</footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import GridReihe from '@/components/GridReihe.vue'
import TextBlock from '@/components/Text.vue'
import Spacer from '@/components/Spacer.vue'
import Angebot from '@/components/Angebot.vue'

const config = useRuntimeConfig()
const showMobileNav = ref(false)
const currentSection = ref('')

const strapiUrl = config.public.strapiUrl.replace(/\/$/, '')

const { data: response, pending, error } = await useFetch(
  `${strapiUrl}/api/onepage?populate[onepagecontent][on][banner.banner][populate][image]=true&populate[onepagecontent][on][banner.banner][populate][button]=true&populate[onepagecontent][on][banner.banner][populate][tech][populate]=tech&populate[onepagecontent][on][text-image.text-mit-bild][populate][image]=true&populate[onepagecontent][on][grid.reihe][populate][TextImage][populate][image]=true&populate[onepagecontent][on][text.text]=true&populate[onepagecontent][on][spacer.spacer]=true&populate[onepagecontent][on][angebot.angebot][populate][angebote]=true`,
  { server: true }
)

const content = computed(() => response.value?.data?.onepagecontent || [])

const blockNav = computed(() => {
  const navBlocks = content.value
    .map((block, idx) => {
      if (!block.navTitle) return null
      let id = (
        block.navTitle + '-' + idx
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return { id, label: block.navTitle }
    })
    .filter(Boolean)

  // Kontakt-Block manuell ergänzen
  navBlocks.push({ id: 'kontakt', label: 'Kontakt' })

  return navBlocks
})

// Active Section Tracken
onMounted(() => {
  const updateCurrentSection = () => {
    for (const block of blockNav.value) {
      const el = document.getElementById(block.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          currentSection.value = block.id
          break
        }
      }
    }
  }

  updateCurrentSection()
  window.addEventListener('scroll', updateCurrentSection)
})

function scrollToAnchor(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleNavClick(id) {
  scrollToAnchor(id)
  if (window.location.hash !== '#' + id) {
    history.replaceState(null, '', '#' + id)
  }
}

function resolveComponent(type) {
  const map = {
    'banner.banner': Banner,
    'grid.reihe': GridReihe,
    'text.text': TextBlock,
    'spacer.spacer': Spacer,
    'angebot.angebot': Angebot,
  }
  return map[type] || 'div'
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
