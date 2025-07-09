<template>
    <component
      :is="`h${level}`"
      :class="['font-bold', headingSize]"
    >
      <slot />
    </component>
  </template>
  
  <script setup>
  const props = defineProps({
    level: { type: [String, Number], default: 1 }
  })
    
  const headingSize = computed(() => {
    return {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl'
    }[props.level] || 'text-lg'
  })
  </script>
  