<template>
    <section class="py-5">
        <div class="flex flex-wrap gap-6 items-bottom justify-left">
          <div
            v-for="item in techList"
            :key="item.id"
            class="flex flex-col items-bottom"
          >
            <Icon
              :name="getIconName(item.tech)"
              :title="item.tech"
              class="text-5xl grayscale-100 opacity-70 hover:opacity-100 hover:grayscale-0 transition"
            />
          </div>
        </div>
    </section>
  </template>
  
  <script setup>
  const props = defineProps({
    data: Array, // erwartet z.B. den Block `data.tech`
  })
  
  const techList = computed(() => {
    return props.data.flatMap(group => group.tech || [])
})
  
  function getIconName(name) {
    const map = {
      Nuxt: 'logos:nuxt-icon',
      Vue: 'logos:vue',
      Laravel: 'logos:laravel',
      Django: 'logos:django-icon',
      Strapi: 'logos:strapi-icon',
      Wagtail: 'logos:wagtail',
    }
    return map[name] || 'mdi:help-circle-outline'
  }
  </script>
  