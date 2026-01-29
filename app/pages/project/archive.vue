<template>
  <div class="project-page">
    <!-- Header -->
    <header class="header">
      <nav class="nav-container">
        <a href="/" class="brand">LABAIG®</a>
        <div class="nav-links">
          <a href="/about" class="nav-link">ABOUT</a>
          <a href="/contact" class="nav-link">CONTACTO</a>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Project Header -->
      <section class="project-header">
        <h1 class="project-title">{{ projectTitle }}</h1>
        <p class="project-description">{{ projectDescription }}</p>
      </section>

      <!-- Project Sections -->
      <section v-for="(section, index) in projectSections" :key="index" class="project-section">
        <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
        
        <!-- Image/Video Gallery -->
        <div class="image-gallery" :class="`gallery-${section.layout || 'single'}`">
          <figure 
            v-for="(image, imgIndex) in section.images" 
            :key="imgIndex"
            class="gallery-item"
            :style="getItemStyles(image)"
          >
            <!-- Video -->
            <video 
              v-if="isVideo(image.src)"
              :src="image.src"
              class="gallery-image"
              @click="openLightbox(image.src, image.alt, true)"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
            />
            <!-- Image -->
            <img 
              v-else
              :src="image.src" 
              :alt="image.alt || `${projectTitle} - Image ${imgIndex + 1}`"
              class="gallery-image"
              @click="openLightbox(image.src, image.alt, false)"
              loading="lazy"
            />
            <figcaption v-if="image.caption" class="image-caption">
              {{ image.caption }}
            </figcaption>
          </figure>
          <div>
            
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <nav class="nav-container">
        <a href="/" class="brand">LABAIG®</a>
        <div class="nav-links">
          <a href="/about" class="nav-link">ABOUT</a>
          <a href="/contact" class="nav-link">CONTACTO</a>
        </div>
      </nav>
    </footer>

    <!-- Lightbox -->
    <Transition name="lightbox-fade">
      <div 
        v-if="lightboxOpen" 
        class="lightbox-overlay" 
        @click="closeLightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Contenido ampliado"
      >
        <!-- Video en lightbox -->
        <video
          v-if="lightboxIsVideo"
          :src="lightboxImage"
          class="lightbox-image"
          :class="{ 'zoom-in': lightboxOpen }"
          @click.stop
          controls
          autoplay
          playsinline
        />
        <!-- Imagen en lightbox -->
        <img 
          v-else
          :src="lightboxImage" 
          :alt="lightboxAlt"
          class="lightbox-image"
          :class="{ 'zoom-in': lightboxOpen }"
          @click.stop="closeLightbox"
        />
        <p v-if="lightboxAlt" class="lightbox-caption">{{ lightboxAlt }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Props - datos del proyecto
const props = defineProps({
  projectTitle: {
    type: String,
    default: 'ARCHIVE'

  },
  projectDescription: {
    type: String,
    default: 'Archivo gráfico de trabajos realizados. Una recopilación que abarca todo tipo de proyectos, mostrando la evolución de su estilo y enfoque creativo a lo largo del tiempo.'
  },
  projectSections: {
    type: Array,
    default: () => [
      {
        title: '',
        layout: 'triple', // 'single', 'double', 'triple'
        images: [
          {
            src: '/images/Revista helvetica/Helvetica-revista_Javier-Labaig_DG3B_1.webp',
            alt: '',
            caption: '',
            background: '#ffffff',
            // padding: '2rem',
            // paddingTop: '1rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          },
          {
            src: '/images/Revista helvetica/Helvetica-revista_Javier-Labaig_DG3B_2.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Revista helvetica/Helvetica-revista_Javier-Labaig_DG3B_3.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Revista helvetica/Helvetica-revista_Javier-Labaig_DG3B_4.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/1negativo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/1positivo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/2negativo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/2positivo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/3negativo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/3positivo.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/torre6.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }

          ,
          {
            src: '/images/Torre Madrid/torre1.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/torre2.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/torre3.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/Torre Madrid/torre4.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/Escultura_final1.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/Escultura_final1.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/Escultura_final2.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/Escultura_final3.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/Escultura_final4.webp',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/logo_twelve-labs.png',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/logo_twelve-labs1.png',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/logo_twelve-labs2.png',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/logo_twelve-labs3.png',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }
          ,
          {
            src: '/images/3d/logo_twelve-labs3.png',
            alt: '',
            caption: '',
            // padding: '2rem',
            paddingTop: '0rem',
            // paddingBottom: '3rem',
            // margin: '2rem 0',
            // marginLeft: '4rem',
          }

          
        ]
      }
    ]
  }
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxAlt = ref('')
const lightboxIsVideo = ref(false)
let previousBodyOverflow = null

// Detectar si es un video por extensión
function isVideo(src) {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v', '.ogv']
  return videoExtensions.some(ext => src.toLowerCase().endsWith(ext))
}

// Obtener estilos personalizados para cada item
function getItemStyles(image) {
  const styles = {}
  
  // Padding
  if (image.padding) styles.padding = image.padding
  if (image.paddingTop) styles.paddingTop = image.paddingTop
  if (image.paddingRight) styles.paddingRight = image.paddingRight
  if (image.paddingBottom) styles.paddingBottom = image.paddingBottom
  if (image.paddingLeft) styles.paddingLeft = image.paddingLeft
  
  // Margin
  if (image.margin) styles.margin = image.margin
  if (image.marginTop) styles.marginTop = image.marginTop
  if (image.marginRight) styles.marginRight = image.marginRight
  if (image.marginBottom) styles.marginBottom = image.marginBottom
  if (image.marginLeft) styles.marginLeft = image.marginLeft
  
  return styles
}

function openLightbox(src, alt = '', isVideoFile = false) {
  lightboxImage.value = src
  lightboxAlt.value = alt
  lightboxIsVideo.value = isVideoFile
  lightboxOpen.value = true
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  lightboxImage.value = ''
  lightboxAlt.value = ''
  lightboxIsVideo.value = false
  document.body.style.overflow = previousBodyOverflow || ''
  previousBodyOverflow = null
}

function handleKeydown(e) {
  if (e.key === 'Escape' && lightboxOpen.value) {
    closeLightbox()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (previousBodyOverflow !== null) {
    document.body.style.overflow = previousBodyOverflow
  }
})
</script>

<style scoped>
/* Reset y base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.project-page {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
}

/* Header & Footer */
.header,
.footer {
  position: sticky;
  padding: 4rem 2rem;
  width: 100%;
  padding: 1.25rem 2rem;
  z-index: 100;
  mix-blend-mode: difference;
  font-weight: 500;
}

.footer {
  position: relative;
  top: auto;
  border-bottom: none;
  margin-top: 6rem;
}

.nav-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.brand:hover {
  opacity: 0.7;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 1;
}

/* Main Content */
.main-content {
  margin: 0 auto;
  padding: 10rem 0rem;
}

/* Project Header */
.project-header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: start;
}

.project-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  padding-left: 2rem;
}

.project-description {
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.6;
  max-width: 65ch;
}

/* Project Sections */
.project-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
}

/* Image Gallery */
.image-gallery {
  display: grid;
  gap: 1rem;
  width: 100%;
}

.gallery-single {
  grid-template-columns: 1fr;
}

.gallery-double {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-triple {
  grid-template-columns: repeat(3, 1fr);
}

.gallery-item {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0px;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  transition: filter 0.3s ease;
}

video.gallery-image {
  background-color: #000;
}

.gallery-image:hover {
  filter: brightness(0.7);
}

.image-caption {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 2rem;
  cursor: zoom-out;
}

.lightbox-image {
  max-width: 95vw;
  max-height: 95vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  cursor: zoom-out;
  user-select: none;
  opacity: 0;
  transform: scale(0.9);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.4s ease;
}

.lightbox-image.zoom-in {
  opacity: 1;
  transform: scale(1);
}

video.lightbox-image {
  cursor: default;
  background-color: #000;
}

.lightbox-caption {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 0.875rem;
  opacity: 0.9;
  text-align: center;
  pointer-events: none;
}

.lightbox-fade-enter-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.lightbox-fade-leave-active {
  transition: opacity 0.25s ease, backdrop-filter 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery-triple {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header,
  .footer {
    padding: 1rem 1.5rem;
  }

  .brand,
  .nav-link {
    font-size: 1rem;
  }

  .nav-links {
    gap: 1.5rem;
  }

  .main-content {
    padding: 3rem 1.5rem;
  }

  .project-header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .project-title {
    font-size: 2rem;
  }

  .project-description {
    font-size: 0.875rem;
  }

  .gallery-double,
  .gallery-triple {
    grid-template-columns: 1fr;
  }

  .image-gallery {
    gap: 1rem;
  }

  .lightbox-overlay {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 1rem;
  }

  .brand,
  .nav-link {
    font-size: 0.875rem;
  }

  .project-title {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>