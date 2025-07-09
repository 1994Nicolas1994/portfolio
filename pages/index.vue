<template>
  <header class="p-4 bg-secondary-500 text-white font-bold fixed w-screen z-50 flex items-center">
    <!-- Hamburger für Mobile -->
    <button
      class="lg:hidden mr-2 focus:outline-none"
      @click="showMobileNav = !showMobileNav"
      aria-label="Menü öffnen"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    <!-- Desktop-Nav -->
    <nav class="hidden lg:flex gap-4 w-full">
      <a
        v-for="block in blockNav"
        :key="block.id"
        :href="'#' + block.id"
        class="hover:text-secondary-1000 transition"
        @click="handleNavClick(block.id)"
      >
        {{ block.label }}
      </a>
    </nav>
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
        >✖</button>
        <a
          v-for="block in blockNav"
          :key="block.id"
          :href="'#' + block.id"
          class="underline hover:no-underline"
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
    </template>

  </main>

  <footer class="p-4 bg-secondary-500 text-white">
    Nicolas Michel | Schwarztorstrasse 105 3007 Bern | © 2025 
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import GridReihe from '@/components/GridReihe.vue'
import TextBlock from '@/components/Text.vue'
import Spacer from '@/components/Spacer.vue'

const config = useRuntimeConfig()

const showMobileNav = ref(false)

const { data: response, pending, error } = await useFetch(
  `${config.public.strapiUrl}/api/onepage?populate[onepagecontent][on][banner.banner][populate][image]=true&populate[onepagecontent][on][banner.banner][populate][button]=true&populate[onepagecontent][on][banner.banner][populate][tech][populate]=tech&populate[onepagecontent][on][grid.reihe][populate][TextImage][populate]=image&populate[onepagecontent][on][text.text]=true&populate[onepagecontent][on][spacer.spacer]=true`,
  { server: true }
)

const content = computed(() => response.value?.data?.onepagecontent || [])

const blockNav = computed(() =>
  content.value
    .map((block, idx) => {
      if (!block.navTitle) return null
      let id = (
        block.navTitle + '-' + idx
      )
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return { id, label: block.navTitle }
    })
    .filter(Boolean)
)

// Smooth Scroll-Handler
function scrollToAnchor(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Desktop: Prevent Standard-Jump, use smooth
function handleNavClick(id) {
  scrollToAnchor(id)
  // Scrollbar-URL updaten, aber kein harter Jump:
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
