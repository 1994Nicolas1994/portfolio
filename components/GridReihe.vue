<template>
  <section class="bg-gradient-to-b from-secondary-900 via-secondary-700 via-40% to-secondary-900 min-h-screen overflow-hidden">
    <div class="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center">
      
      <BaseHeading level="2" class="text-white text-left w-full">Projekte</BaseHeading>

      <Spacer />

      <!-- Grid mit Karten -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div v-for="item in data.TextImage" :key="item.id" class="relative">
          <ProjektKarte :item="item" @click="handleClick(item)" />

          <!-- Mobile: Inline-Detail direkt unter der Karte -->
          <transition name="slide-down">
            <div
              v-if="activeItem && activeItem.id === item.id && isMobile"
              class="bg-white shadow-md rounded-lg transition-all duration-300 ease-in-out p-6 mt-2"
            >
              <div class="flex justify-end">
                <button @click="activeItem = null" class="text-gray-500 hover:text-gray-800 text-2xl">✖</button>
              </div>
              <BaseMarkdown v-if="activeItem.description" :text="activeItem.description" />
            </div>
          </transition>
        </div>
      </div>

      <Spacer />
    </div>

    <!-- Desktop: Modal mit BaseModal (sichtbar nur bei grossen Screens) -->
    <BaseModal
      v-if="activeItem && !isMobile"
      :show="true"
      @close="activeItem = null"
      class="hidden lg:block"
    >
      <div class="prose max-w-none">
        <BaseMarkdown :text="activeItem.description" />
      </div>
    </BaseModal>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import vue3MarkdownIt from 'vue3-markdown-it'

const props = defineProps({ data: Object })
const activeItem = ref(null)
const isMobile = ref(false)

function handleClick(item) {
  // Stelle sicher, dass item ein plain object ist, um Serialisierungsprobleme zu vermeiden.
  activeItem.value = JSON.parse(JSON.stringify(item))
}

onMounted(() => {
  function checkMobile() {
    // lg entspricht typischerweise 1024px – hier gilt: unter 1024px = Mobile.
    isMobile.value = window.innerWidth < 1024
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
