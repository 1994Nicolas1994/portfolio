<template>
    <div :class="spacerClass" />
  </template>
  
  <script setup>
const props = defineProps({
  data: Object
})

const spacerClass = computed(() => {
  const size = props.data?.spacerSize || 'normal'
  const sizes = {
    small: 'my-4',
    normal: 'my-8',
    big: 'my-16',
  }
  return sizes[size] || sizes.md
})

  </script>