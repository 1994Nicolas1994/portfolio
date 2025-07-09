<template>
  <div class="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-900 min-h-[3.5em]">
    <span>{{ displayed }}</span><span class="blinking-cursor">|</span>
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
  if (!props.subline) return
  if (j <= props.subline.length) {
    typedSubline.value = props.subline.slice(0, j)
    j++
    setTimeout(typeWriterSubline, props.speed)
  }
}

// Immer neu tippen, wenn sich die Props ändern
watch(
  () => props.name,
  (val) => {
    displayed.value = ''
    typedSubline.value = ''
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
