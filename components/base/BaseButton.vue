<template>
  <button
    :class="[
      'flex items-center gap-2 px-4 py-2 text-white rounded-md font-bold transition shadow-lg cursor-pointer',
      variants[variant] || variants.primary
    ]"
  >
    <component
      v-if="icon && resolveIcon(icon)"
      :is="resolveIcon(icon)"
      class="w-5 h-5"
    />
    <slot />
  </button>
</template>

<script setup>
import * as LucideIcons from 'lucide-vue-next'

defineProps({
  icon: String,
  variant: {
    type: String,
    default: 'primary',
  },
})

function resolveIcon(name) {
  return LucideIcons[name] || null
}

const variants = {
  primary:
    'bg-primary-500 hover:bg-secondary-500 shadow-primary-500/40 hover:shadow-secondary-500/50',
  secondary:
    'bg-linear-90 from-primary-900 to-secondary-900 hover:from-primary-500 hover:to-secondary-500 shadow-secondary-500/40 hover:shadow-primary-500/50',
  third:
    'bg-third-500 hover:bg-primary-500 shadow-third-500/40 hover:shadow-primary-500/50',
}
</script>
