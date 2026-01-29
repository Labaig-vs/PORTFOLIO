  <template>
    <div class="relative min-h-screen w-screen bg-black text-white  overflow-hidden">
      <Transition name="splash-fade">
        <div v-if="showSplash" class="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <!-- Contenedor de animación de texto -->
          <div class="relative w-full h-full overflow-hidden flex items-center justify-center">
            <!-- Textos animados -->
            <div 
              v-for="(item, index) in textItems" 
              :key="item.id"
              class="absolute text-animation"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              ARDE LABAIG
            </div>
          </div>
        </div>
      </Transition>

      <!-- header fuera del transition: siempre se renderiza -->
      <header class="fixed top-2.5 left-0 right-0 px-6 md:px-10 py-5 flex items-center justify-between select-none z-10">
        <a href="/?nosplash=1" class="text-xs md:text-[1.2em] tracking-[0.06em] font-semibold uppercase">LABAIG®</a>
      </header>

      <Transition name="main-fade">
        <div v-show="!showSplash">
          <ClientOnly v-if="isHomeRoute">
            <div class="absolute inset-0 z-0">
              <!-- forzamos remount del GlassStack aplicando key -->
              <GlassStack
                ref="glassStack"
                class="w-full h-full"
                :projects="projects"
                :highlight-index="6"
                :key="$route.fullPath"
              />
            </div>
          </ClientOnly>

          <!-- Contenido fijo/estático de index (si lo necesitas) -->
          <main class="relative z-10">
            <!-- tu contenido de índice aquí -->
          </main>
        </div>
      </Transition>
    </div>
  </template>

  <script setup>
  // IMPORT CORREGIDA (ruta relativa desde app/pages/index.vue hasta components/GlassStack.vue)
  import GlassStack from '../../components/GlassStack.vue'
  import { ref, onMounted, nextTick, computed } from 'vue'
  import { useRoute } from 'vue-router'

  /* CONFIG */
  const SPLASH_DURATION_MS = 3500  // Duración total del splash (4 segundos)

  /* Rutas / estado */
  const route = useRoute()
  const isHomeRoute = computed(() => {
    if (route?.name === 'index') return true
    if (typeof window !== 'undefined') {
      return window.location?.pathname === '/'
    }
    return false
  })

  const showSplash = ref(true)
  const glassStack = ref(null)

  // Crear muchos items de texto para la animación continua
  const textItems = ref(
    Array.from({ length: 50 }, (_, i) => ({ id: i }))
  )

  const projects = ref([
    { id: 'CLUSTER',  title: 'CLUSTER',  imageSmall: '/images/Cluster/cluster.png', image: '/images/Cluster/cluster.png', century: 'S. V–XV', href: '/project/cluster' },
    { id: 'TESTIGOS',  title: 'TESTIGOS',  imageSmall: '/images/Testigos/poster.png', image: '/images/Testigos/poster.png', century: 'S. V–XV', href: '/project/testigos' },
    { id: 'FP2P',  title: 'FP2P',  imageSmall: '/images/fp2p/fp2p.png', image: '/images/fp2p/fp2p.png', century: 'S. V–XV', href: '/project/testigos' },
    { id: 'GLASS LAB',  title: 'GLASS LAB',  imageSmall: '/images/chips2.png', image: '/images/chips2.png', century: 'S. V–XV', href: '/project/glass' },
    { id: 'FITZPLEASURE',  title: 'FITZPLEASURE',  imageSmall: '/images/FitzPleasure/FitzPleasure.png', image: '/images/FitzPleasure/FitzPleasure.png', century: 'S. V–XV', href: '/project/fitz' },
    { id: 'ZEST',  title: 'ZEST',  imageSmall: '/images/ZEST/Logo3.jpg', image: '/images/ZEST/Logo3.jpg', century: 'S. V–XV', href: '/project/zest' },
    { id: 'ARDE',  title: 'ARDE',  imageSmall: '/images/ARDE/antorcha1.jpg', image: '/images/ARDE/antorcha1.jpg', century: 'S. V–XV', href: '/project/arde' },
    { id: 'ARDOSA',  title: 'ARDOSA',  imageSmall: '/images/ARDOSA/mockup-vino3.jpg', image: '/images/ARDOSA/mockup-vino3.jpg', century: 'S. V–XV', href: '/project/ardosa' },
    { id: 'EUR',  title: 'EUR',  imageSmall: '/images/EUR/eur1.jpg', image: '/images/EUR/eur1.jpg', century: 'S. V–XV', href: '/project/eur' },
    { id: 'ARCHIVE',  title: 'ARCHIVE',  imageSmall: '/images/Revista Helvetica/Helvetica-revista_Javier-Labaig_DG3B_1 - copia.jpg', image: '/images/Revista Helvetica/Helvetica-revista_Javier-Labaig_DG3B_1 - copia.jpg', century: 'S. V–XV', href: '/project/archive' },


  ])

  /* cerrar splash y forzar resize del GlassStack */
  function finalizeSplashHide() {
    showSplash.value = false
    try { sessionStorage.setItem('visited', '1') } catch (e) {}
    nextTick().then(() => {
      try {
        if (glassStack.value && typeof glassStack.value.forceResize === 'function') {
          glassStack.value.forceResize()
        }
      } catch (e) { /* noop */ }
    })
  }

  /* montaje */
  onMounted(async () => {
    await nextTick()
    if (typeof window === 'undefined') return

    if (!isHomeRoute.value) {
      showSplash.value = false
      return
    }

    const noSplash = route?.query?.nosplash === '1'
    const hasVisited = (() => {
      try { return sessionStorage.getItem('visited') === '1' } catch { return false }
    })()
    
    if (noSplash || hasVisited) {
      showSplash.value = false
      return
    }

    // Iniciar el timer para ocultar el splash
    setTimeout(() => {
      finalizeSplashHide()
    }, SPLASH_DURATION_MS)
  })
  </script>

  <style scoped>
  /* Transiciones del splash */
  .splash-fade-enter-active { transition: none; }
  .splash-fade-leave-active { transition: opacity 3s ease-in-out; }
  .splash-fade-leave-to { opacity: 0; }
  .main-fade-enter-active { transition: opacity 2s ease-in-out 2s; }
  .main-fade-enter-from { opacity: 0; }

  /* Animación de texto */
  .text-animation {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.01em;
    animation: riseUp 9s linear forwards;
    opacity: 0;
    line-height: 1;
    color: white;
  }

  @keyframes riseUp {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    5% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(-220vh);
    }
  }

  /* util sr-only para accesibilidad */
  .sr-only {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap; border: 0;
  }
  </style>