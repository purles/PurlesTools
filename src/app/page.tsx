'use client'

import { useState, useEffect, useRef } from 'react'

interface Project {
  name: string
  description: string
  longDescription: string
  demoUrl: string
}

interface Category {
  title: string
  projects: Project[]
}

// Nowa kolejność: E-commerce → QR → Treści → Obrazy
const categories: Category[] = [
  {
    title: "E-commerce & Analityka",
    projects: [
      {
        name: "Payment Matcher",
        description: "Dopasowywanie płatności IDS",
        longDescription: "Automatyczne dopasowywanie płatności do zamówień w IdoSell. Redukcja czasu weryfikacji.",
        demoUrl: "https://purles.github.io/IDoSell-Payment-Matcher"
      },
      {
        name: "Order Stats",
        description: "Statystyki zamówień",
        longDescription: "Dashboard ze statystykami zamówień IdoSell. Trendy i analiza sprzedaży.",
        demoUrl: "https://purles.github.io/order-stats"
      },
      {
        name: "Konwerter SKU",
        description: "SKU Purlés → ID IdoSell",
        longDescription: "Konwersja wewnętrznych kodów SKU na identyfikatory IdoSell dla wyszukiwania.",
        demoUrl: "https://purles.github.io/konwerterSKU"
      },
      {
        name: "Paczkomat Extractor",
        description: "Ekstrakcja danych InPost",
        longDescription: "Wyciąganie i przetwarzanie danych o wysyłkach przez paczkomaty.",
        demoUrl: "https://purles.github.io/paczkomat-extractor"
      },
      {
        name: "Generator Bonów",
        description: "PDF z bonami podarunkowymi",
        longDescription: "Generowanie bonów podarunkowych w PDF. Personalizacja wartości i dat ważności.",
        demoUrl: "https://purles.github.io/generator-bonow"
      }
    ]
  },
  {
    title: "QR",
    projects: [
      {
        name: "QR Generator",
        description: "Kody QR z brandingiem Purlés",
        longDescription: "Generator kodów QR do materiałów marketingowych i opakowań.",
        demoUrl: "https://purles.github.io/QR"
      },
      {
        name: "Simple QR",
        description: "Szybki generator QR",
        longDescription: "Minimalistyczny generator podstawowych kodów QR.",
        demoUrl: "https://purles.github.io/SimpleQR"
      }
    ]
  },
  {
    title: "Treści & Opisy",
    projects: [
      {
        name: "Description Generator",
        description: "Generator opisów produktowych",
        longDescription: "Automatyzacja tworzenia spójnych opisów dla katalogu produktów Purlés.",
        demoUrl: "https://purles.github.io/description"
      },
      {
        name: "Formatter",
        description: "Formatowanie tekstów",
        longDescription: "Standaryzacja formatowania tekstów - usuwanie niechcianych znaków, poprawianie interpunkcji.",
        demoUrl: "https://purles.github.io/formatter"
      },
      {
        name: "IDS Content Editor",
        description: "Edytor HTML opisów",
        longDescription: "Edytor HTML zoptymalizowany pod opisy w IdoSell. Podgląd na żywo i walidacja.",
        demoUrl: "https://purles.github.io/IDS-content-editor"
      },
      {
        name: "Description Translator",
        description: "Tłumaczenie opisów FR/ENG",
        longDescription: "Wspomaganie tłumaczenia opisów produktowych. Zachowuje formatowanie i strukturę tekstu.",
        demoUrl: "https://purles.github.io/Purles-description-translator"
      },
      {
        name: "Wpisy Blogowe",
        description: "Kreator wpisów dla purles.pl",
        longDescription: "Tworzenie i formatowanie wpisów blogowych dla nowej strony Purlés.",
        demoUrl: "https://purles.github.io/wpisy-blogowe"
      },
      {
        name: "Wpisy Blogowe Sklep",
        description: "Edytor wpisów dla sklep.purles.pl",
        longDescription: "Dedykowany edytor treści blogowych dla sklepu internetowego.",
        demoUrl: "https://purles.github.io/wpisy-blogowe-sklep"
      }
    ]
  },
  {
    title: "Obrazy",
    projects: [
      {
        name: "Image Cropper",
        description: "Przycinanie zdjęć produktowych 2x",
        longDescription: "Przycinanie i kadrowanie zdjęć produktowych. Output jest 2x większy niż wymiary przycięcia - idealne do zdjęć wysokiej jakości w IdoSell.",
        demoUrl: "https://purles.github.io/image-cropper2x"
      }
    ]
  }
]

// Smooth scroll helper function
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) return

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const duration = 800
  const startTime = performance.now()

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

// Animated Background Component - Premium layered blobs
function AnimatedBackground() {
  return (
    <div className="animated-bg">
      {/* Layer 1: Large base blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Layer 2: Medium accent blobs with blend */}
      <div className="blob blob-4" />
      <div className="blob blob-5" />
      <div className="blob blob-6" />

      {/* Layer 3: Small highlight blobs */}
      <div className="blob blob-7" />
      <div className="blob blob-8" />
      <div className="blob blob-9" />
      <div className="blob blob-10" />

      {/* Noise overlay for organic feel */}
      <div className="noise-overlay" />

      {/* Rising particles */}
      <div className="particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Subtle grid */}
      <div className="grid-overlay" />
    </div>
  )
}

// Footer Particles - denser toward bottom
function FooterParticles() {
  return (
    <div className="footer-particles">
      {[...Array(30)].map((_, i) => (
        <div key={i} className={`footer-particle fp-${i + 1}`} />
      ))}
    </div>
  )
}

// Sticky Navigation with Progress Bar and Stagger Animation
function StickyNav({ visible, progress }: { visible: boolean; progress: number }) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    smoothScrollTo(sectionId)
  }

  return (
    <nav className={`sticky-nav ${visible ? 'visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="https://www.purles.pl" target="_blank" rel="noopener noreferrer">
          <img
            src="https://sklep.purles.pl/data/gfx/mask/pol/logo_1_big.svg"
            alt="Purlés"
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </a>
        <div className="flex items-center gap-1">
          {categories.map((cat, index) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              onClick={(e) => handleNavClick(e, cat.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-'))}
              className="nav-link text-sm"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {cat.title}
            </a>
          ))}
          <a
            href="#footer"
            onClick={(e) => handleNavClick(e, 'footer')}
            className="nav-link text-sm"
            style={{ animationDelay: `${categories.length * 0.15}s` }}
          >
            Kontakt
          </a>
        </div>
      </div>
      {/* Progress bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  )
}

// Project Card with Spotlight Effect - Clickable to expand
function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on the CTA button
    if ((e.target as HTMLElement).closest('.cta-button')) return
    setIsExpanded(!isExpanded)
  }

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      ref={cardRef}
      className={`project-card p-6 cursor-pointer ${isExpanded ? 'expanded' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        '--spotlight-opacity': isHovered ? 1 : 0
      } as React.CSSProperties}
    >
      {/* Spotlight effect */}
      <div className="spotlight" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.name}
            </h3>

            <p className="text-zinc-400 mb-4">
              {project.description}
            </p>
          </div>

          {/* Chevron indicator */}
          <div className={`chevron-indicator ${isExpanded ? 'expanded' : ''}`}>
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className={`expanded-content ${isExpanded ? 'open' : ''}`}>
          <p className="text-zinc-500 mb-4 pt-3 border-t border-zinc-700/50">
            {project.longDescription}
          </p>
        </div>

        <div className="flex items-center mt-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="cta-button btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Otwórz
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Category Section
function CategorySection({ category }: { category: Category }) {
  const sectionId = category.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')

  return (
    <section id={sectionId} className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
        <div className="category-bar" />
        <span className="category-title">{category.title}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer id="footer" className="footer-section mt-32 pt-20 pb-12 relative">
      <FooterParticles />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4">
          Masz pomysł na nowe narzędzie?
        </h3>

        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
          Szukasz automatyzacji dla powtarzalnych zadań? Masz pytania dotyczące AI?
          Zgłoś pomysł lub umów się na rozmowę.
        </p>

        <a
          href="#PLACEHOLDER_ASANA_FORM_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Zgłoś pomysł
          </span>
        </a>

        <div className="mt-20 pt-8">
          <p className="text-zinc-600 text-sm">
            Created by <span className="text-purple-400">Kornel Skąpski</span> for{' '}
            <a
              href="https://www.purles.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Purlés
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// Contact Float Button
function ContactFloat() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    smoothScrollTo('footer')
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 left-8 float-btn flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span>Masz pomysł?</span>
    </button>
  )
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const start = window.scrollY
    const startTime = performance.now()
    const duration = 1000

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      window.scrollTo(0, start * (1 - eased))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 float-btn p-4 rounded-xl text-white z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

// Main Page
export default function Home() {
  const [showNav, setShowNav] = useState(false)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Smooth scroll effect for wheel events
  useEffect(() => {
    let currentScroll = window.scrollY
    let targetScroll = window.scrollY
    let isScrolling = false

    const smoothScroll = () => {
      const diff = targetScroll - currentScroll
      const ease = 0.08 // Lower = smoother, higher = more responsive

      if (Math.abs(diff) > 0.5) {
        currentScroll += diff * ease
        window.scrollTo(0, currentScroll)
        requestAnimationFrame(smoothScroll)
      } else {
        currentScroll = targetScroll
        window.scrollTo(0, currentScroll)
        isScrolling = false
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + e.deltaY))

      if (!isScrolling) {
        isScrolling = true
        requestAnimationFrame(smoothScroll)
      }
    }

    // Sync on regular scroll (for scrollbar dragging, keyboard, etc.)
    const handleScroll = () => {
      if (!isScrolling) {
        currentScroll = window.scrollY
        targetScroll = window.scrollY
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // UI state updates based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - windowHeight

      setShowNav(scrollY > 200)

      const opacity = Math.max(0, 1 - scrollY / 200)
      setHeroOpacity(opacity)

      const progress = (scrollY / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatedBackground />
      <StickyNav visible={showNav} progress={scrollProgress} />

      <main className="relative z-10 min-h-screen px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Logo in corner - links to purles.pl */}
          <a
            href="https://www.purles.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 left-6 md:left-12 lg:left-24 z-20"
          >
            <img
              src="https://sklep.purles.pl/data/gfx/mask/pol/logo_1_big.svg"
              alt="Purlés"
              className="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </a>

          {/* Hero Section - fades with opacity on scroll */}
          <header
            className="pt-24 pb-16 text-center"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${(1 - heroOpacity) * -30}px)`,
              pointerEvents: heroOpacity < 0.1 ? 'none' : 'auto'
            }}
          >
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
              Purlés Tools
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Biblioteka narzędzi automatyzacji i produktywności
            </p>
          </header>

          {/* Categories */}
          {categories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}

          <Footer />
        </div>
      </main>

      <ContactFloat />
      <BackToTop />
    </>
  )
}
