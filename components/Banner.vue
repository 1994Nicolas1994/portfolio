<template>
  <section class="flex items-center bg-linear-20 from-primary-100 via-white via-40% to-primary-100 min-h-screen p-4 sm:p-8">
    <div class="container mx-auto">
      <!-- Grid: ab md zwei Spalten, auf Mobile Bild oben, Text unten -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <!-- Text -->
        <div class="space-y-6 flex flex-col items-center md:items-start order-2 md:order-1">
          <TypewriterName v-if="data.Title" :name="data.Title" />

          <BaseMarkdown v-if="data.text" :text="data.text">
            {{ data.text }}
          </BaseMarkdown>

          <BaseButton
  v-if="data.button"
  class="mt-2"
  :icon="data.button.icon"
  @click="handleButtonClick(data.button.url)"
>
  {{ data.button.label }}
</BaseButton>


          <div class="pt-4 sm:pt-8 w-full flex justify-center md:justify-start">
            <TechLine v-if="data.tech" :data="data.tech" />
          </div>
        </div>

        <!-- Bild -->
        <div
          v-if="imageUrl"
          :class="[
            'w-full flex justify-center order-1 md:order-2 mb-6 md:mb-0',
            data.Title ? 'hidden md:flex' : 'flex'
          ]"
        >
          <img
            :src="imageUrl"
            alt="Banner Image"
            class="max-h-[48vh] sm:max-h-[66vh] w-auto max-w-xs sm:max-w-sm md:max-w-full mx-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({ data: Object })

const imageUrl = ref('')

onMounted(() => {
  const strapiBaseUrl = useRuntimeConfig().public.strapiUrl.replace(/\/$/, '') // 🔥 entfernt abschliessenden Slash

  const imagePath =
    props.data?.image?.url ||
    props.data?.image?.data?.attributes?.url

  if (imagePath) {
    imageUrl.value = strapiBaseUrl + imagePath
  }
})


function handleButtonClick(url) {
  if (!url) return

  if (url.startsWith('#')) {
    const id = url.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  } else {
    window.open(url, '_blank')
  }
}
</script>
