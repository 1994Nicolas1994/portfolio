<template>
    <div class="p-6 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ page?.title }}</h1>
      <p class="text-gray-700 whitespace-pre-line">{{ page?.content }}</p>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const config = useRuntimeConfig()
  
  // Serverseitiger fetch (vermeidet devalue-Fehler)
  const { data: response } = await useFetch(
    `${config.public.strapiUrl}/api/pages?filters[slug][$eq]=${route.params.slug}`,
    { server: true }
  )
  
  // Hole das erste gefundene Page-Objekt
  const page = response.value?.data?.[0] ?? null
  
  // Falls keine Seite gefunden → 404 anzeigen
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Seite nicht gefunden' })
  }
  </script>
  