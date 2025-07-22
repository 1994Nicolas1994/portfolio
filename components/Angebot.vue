<template>
  <section class="relative min-h-screen bg-gradient-to-b from-[#edeaf8] via-white via-40% to-[#edeaf8] overflow-hidden">
    <div class="container mx-auto px-4 relative z-10 flex flex-col justify-center min-h-screen">
      <Spacer />
      <BaseHeading level="2">{{ data.title }}</BaseHeading>
      <Spacer />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <TransitionGroup name="bounce" tag="div" class="contents">
          <div
            v-for="item in data.angebote"
            :key="item.id"
            class="card-gradient bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
          >
            <span v-if="item.icon && iconMap[item.icon]" v-html="iconMap[item.icon]"
              class="transition-transform duration-200 group-hover:scale-125"
            ></span>
            <h3 class="font-bold text-2xl mb-3 mt-2 text-secondary-500">{{ item.headline }}</h3>
            <div class="text-[#2d214a] font-medium">
              <template v-for="(desc, dIdx) in item.description" :key="dIdx">
                <p v-if="desc.type === 'paragraph'">
                  <template v-for="(child, cIdx) in desc.children" :key="cIdx">
                    {{ child.text }}
                  </template>
                </p>
              </template>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <Spacer />
    </div>

    <!-- CTA-Bereich -->
    <div class="relative w-full bg-[#f7f5ff] shadow-inner py-14 flex flex-col items-center justify-center z-20 px-4">
      <Spacer />
      <h3 class="text-2xl sm:text-3xl font-bold text-[#2d214a] mb-3 text-center">
        Bereit für dein Projekt?
      </h3>
      <p class="text-base sm:text-lg text-[#2d214a] mb-8 text-center max-w-xl">
        Ob Website, Webapp oder Consulting – ich helfe dir, dein digitales Vorhaben smart & zuverlässig umzusetzen.<br>
        <span class="font-semibold">Schreib mir kurz, was du planst – ich melde mich mit Ideen zurück!</span>
      </p>
      <a
        href="#kontakt"
        class="inline-block bg-gradient-to-r from-[#8375b7] to-[#5eb6cc] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
      >
        Projekt anfragen
      </a>
      <Spacer />
    </div>

    <!-- Blur Deko -->
    <div class="absolute -top-32 -left-36 w-96 h-96 bg-[#5eb6cc]/30 rounded-full filter blur-3xl z-0"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-[#8375b7]/20 rounded-full filter blur-2xl z-0"></div>
  </section>
</template>

<script setup>
const props = defineProps({ data: Object })

const iconMap = {
  'code': `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="#fff">
    <rect x="2" y="4" width="20" height="16" rx="4" fill="#fff"/>
    <path stroke="#8375b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
  </svg>`,
  'clipboard-check': `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="#fff">
    <rect x="4" y="4" width="16" height="16" rx="4" fill="#fff"/>
    <path stroke="#8375b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4-4m1 7H5a2 2 0 01-2-2V7a2 2 0 012-2h2.586A2 2 0 0110 4h4a2 2 0 011.414.586L18 5.586A2 2 0 0120 7v10a2 2 0 01-2 2z"/>
  </svg>`,
  'light-bulb': `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="#fff">
    <circle cx="12" cy="10" r="7" fill="#fff" opacity="0.2"/>
    <path stroke="#8375b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3a7 7 0 00-7 7c0 3.53 2.61 6.43 6 6.92V21h2v-4.08c3.39-.49 6-3.39 6-6.92a7 7 0 00-7-7z"/>
  </svg>`,
  'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="#fff">
    <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.13"/>
    <path stroke="#8375b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 9l2 2 4-4m6 6l2 2 4-4M9 13l2 2 4-4"/>
  </svg>`
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.7s cubic-bezier(.2,1.8,.3,1);
}
@keyframes bounce-in {
  0%   { transform: scale(0.8); opacity: 0; }
  60%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
</style>
