<template>
  <div class="font-mono text-4xl text-center sm:text-center md:text-left sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-primary-900 min-h-[3.5em]">
    <span>{{ displayed }}</span>
    <span v-if="showCursor" class="blinking-cursor">|</span>
    <div class="text-base sm:text-xl mt-2 text-secondary-700" v-if="typedSubline || subline">
      <span v-if="typedSubline">{{ typedSubline }}</span>
      <span v-else class="invisible">{{ subline }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  subline: { type: String, default: '' },
  speed: { type: Number, default: 35 }
})

const displayed = ref('')
const typedSubline = ref('')
const showCursor = ref(true)
let i = 0
let j = 0

function typeWriterName() {
  if (!props.name) return
  if (i <= props.name.length) {
    displayed.value = props.name.slice(0, i)
    i++
    setTimeout(typeWriterName, props.speed)
  } else {
    typeWriterSubline()
  }
}

function typeWriterSubline() {
  if (!props.subline) {
    showCursor.value = false
    return
  }
  if (j <= props.subline.length) {
    typedSubline.value = props.subline.slice(0, j)
    j++
    setTimeout(typeWriterSubline, props.speed)
  } else {
    showCursor.value = false
  }
}

// Reagiert auf Änderungen
watch(
  () => props.name,
  (val) => {
    displayed.value = ''
    typedSubline.value = ''
    showCursor.value = true
    i = 0
    j = 0
    if (val) typeWriterName()
  },
  { immediate: true }
)
</script>

<style scoped>
.blinking-cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
</style>
