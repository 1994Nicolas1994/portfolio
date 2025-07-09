<template>
  <transition name="fade">
    <div v-show="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black opacity-60" @click="close"></div>

      <!-- Modal Content -->
      <div
        class="relative bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 z-50 mx-auto my-20"
        style="max-height: 80vh;"
      >
        <!-- Close Button STICKY -->
        <div class="sticky top-0 left-0 bg-white z-20 flex justify-end p-2 pb-0 rounded-t-lg">
          <button @click="close" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">✖</button>
        </div>
        <!-- Slot for Content -->
        <div class="p-2 pt-0 overflow-y-auto" style="max-height: calc(80vh - 3rem);">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close'])
const close = () => emit('close')

let originalOverflow = ''

// Debug: Log bei jedem Setup/Render
console.log('[BaseModal] mounted. show:', props.show)

// Watch auf show-Prop für Body-Scroll-Handling
watch(
  () => props.show,
  (val) => {
    console.log('[BaseModal] Watch show:', val)
    if (typeof window === 'undefined') return
    if (val) {
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      console.log('Modal geöffnet, Body-Scroll deaktiviert')
    } else {
      document.body.style.overflow = originalOverflow || ''
      console.log('Modal geschlossen, Body-Scroll zurückgesetzt')
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  // Falls Modal z. B. mit show=true zerstört wird, trotzdem Body fixen!
  document.body.style.overflow = originalOverflow || ''
  console.log('[BaseModal] unmounted, Body-Scroll zurückgesetzt')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
