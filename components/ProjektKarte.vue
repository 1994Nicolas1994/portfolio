<template>
  <div class="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
    <div v-if="item.image?.url" class="mb-4">
      <img
        :src="getImageUrl(item.image)"
        :alt="item.headline"
        class="w-full h-48 object-cover transition duration-500 ease-in-out brightness-110 contrast-75 saturate-50 hover:contrast-100 hover:saturate-100 rounded-t-lg"
      />
    </div>

    <div class="p-5">
      <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ item.headline }}</h3>
      <p v-if="item.text" class="text-gray-600 leading-relaxed mb-4">{{ item.text }}</p>

      <div class="my-5">
        <a @click="$emit('click')" class="cursor-pointer underline">Mehr erfahren</a>
      </div>

      <!-- Button mit stop modifier -->
      <router-link
        v-if="item.link && !isExternal(item.link)"
        :to="item.link"
      >
        <BaseButton variant="secondary" @click.stop>
          Zum Projekt
        </BaseButton>
      </router-link>
      <a
        v-else-if="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaseButton variant="secondary" @click.stop>
          Zum Projekt
        </BaseButton>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object })

// Hole die Runtime Config (aus nuxt.config.ts oder .env)
const { public: { strapiUrl } } = useRuntimeConfig()

// Entfernt abschliessenden Slash (z.B. https://domain.com/ → https://domain.com)
const baseUrl = strapiUrl.replace(/\/$/, '')

// Liefert vollständige Bild-URL zurück
const getImageUrl = (image) => {
  const path = image.formats?.medium?.url || image.url
  return baseUrl + path
}

// Prüft, ob der Link extern ist
function isExternal(url) {
  return /^https?:\/\//.test(url)
}
</script>
