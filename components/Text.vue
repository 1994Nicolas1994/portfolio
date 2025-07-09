<template>
    <section class="container mx-auto">
      <BaseMarkdown v-if="data.text" :text="data.text" />
    </section>
  </template>
  
  <script setup>
  const props = defineProps({ data: Object })
  </script>
  