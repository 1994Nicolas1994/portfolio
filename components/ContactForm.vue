<template>
  <section
    id="kontakt"
    class="w-full flex items-center justify-center py-24 bg-gradient-to-t from-[#edeaf8] via-white via-40% to-[#edeaf8] min-h-[60vh] relative z-20"
  >
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-lg bg-white/80 rounded-2xl shadow-xl p-10 flex flex-col gap-6 border border-[#8375b7]/10"
      autocomplete="off"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-[#2d214a] mb-2 text-center">
        Kontaktiere mich
      </h2>
      <p class="text-[#8375b7] text-center mb-2">Ich melde mich so schnell wie möglich zurück!</p>

      <div>
        <label class="block text-[#2d214a] font-semibold mb-1" for="name">Name*</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          required
          class="w-full px-4 py-3 rounded-lg border border-[#8375b7]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#8375b7]"
        />
      </div>

      <div>
        <label class="block text-[#2d214a] font-semibold mb-1" for="email">E-Mail*</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="w-full px-4 py-3 rounded-lg border border-[#8375b7]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#8375b7]"
        />
      </div>

      <div>
        <label class="block text-[#2d214a] font-semibold mb-1" for="message">Nachricht*</label>
        <textarea
          v-model="form.message"
          id="message"
          rows="5"
          required
          class="w-full px-4 py-3 rounded-lg border border-[#8375b7]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#8375b7]"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-gradient-to-r from-[#8375b7] to-[#5eb6cc] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60"
      >
        {{ loading ? "Wird gesendet..." : "Abschicken" }}
      </button>

      <div v-if="success" class="text-green-600 text-center font-bold pt-2">
        Danke für deine Nachricht! Ich melde mich bald.
      </div>
      <div v-if="error" class="text-red-500 text-center pt-2">
        Uups! Etwas ist schiefgelaufen. Bitte versuch es nochmal.
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

const handleSubmit = async () => {
  loading.value = true
  success.value = false
  error.value = false

  try {
    // Verhindert doppelten Slash
    const baseUrl = config.public.strapiUrl.replace(/\/$/, '')
    const endpoint = `${baseUrl}/api/kontakts`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: form.value.name,
          email: form.value.email,
          nachricht: form.value.message,
        },
      }),
    })

    if (!response.ok) throw new Error('Fehler beim Senden')

    form.value = { name: '', email: '', message: '' }
    success.value = true
  } catch (e) {
    error.value = true
    console.error('Sende-Fehler:', e)
  } finally {
    loading.value = false
  }
}
</script>
