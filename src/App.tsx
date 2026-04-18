import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Menu, X, ArrowRight, Globe, ShoppingCart, RefreshCw, 
  Zap, DollarSign, Smartphone, MessageCircle, 
  Clock, Star, Send, Mail, Phone, Instagram, Linkedin, 
  Twitter, Check, Quote, Layout, Code2, Palette
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Text Scramble Effect Component
const ScrambleText = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const elRef = useRef<HTMLSpanElement>(null)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  
  useEffect(() => {
    if (!elRef.current) return
    
    const el = elRef.current
    const originalText = text
    let iteration = 0
    let interval: ReturnType<typeof setInterval>
    
    const startScramble = () => {
      interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
        
        if (iteration >= originalText.length) {
          clearInterval(interval)
        }
        
        iteration += 1 / 2
      }, 30)
    }
    
    const timer = setTimeout(startScramble, delay)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [text, delay])
  
  return <span ref={elRef} className={className}>{text}</span>
}

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-dark/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-xl text-foreground">
          Elite<span className="text-gold">Web</span>Solutions
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="https://wa.me/2348037985366"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm"
          >
            Start a Project
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-b border-white/5 px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-lg text-muted-foreground hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="https://wa.me/2348037985366"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center mt-4"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section - Vertical Scroll
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return
    
    const ctx = gsap.context(() => {
      // Entrance animation on load
      gsap.fromTo(content.querySelectorAll('.hero-animate'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={sectionRef} className="relative min-h-screen bg-dark flex items-center pt-20">
      <div className="w-full px-6 lg:px-[6vw] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <p className="hero-animate eyebrow mb-6">Based in Nigeria • Working Worldwide</p>
            <h1 className="hero-animate font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight mb-6">
              <ScrambleText text="I Build Modern" delay={500} />
              <br />
              <span className="text-gold"><ScrambleText text="Websites That" delay={900} /></span>
              <br />
              <ScrambleText text="Grow Your Business" delay={1300} />
            </h1>
            <p className="hero-animate text-muted-foreground text-lg max-w-xl mb-8">
              Affordable, fast, and professional websites for businesses worldwide. Let's turn your vision into a stunning online presence.
            </p>
            
            <div className="hero-animate flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/2348037985366"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-solid flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Chat Me on WhatsApp
              </a>
              <a 
                href="#portfolio"
                className="btn-gold flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          
          {/* Portrait */}
          <div className="hero-animate order-1 lg:order-2">
            <div className="card-dark shadow-card overflow-hidden relative max-w-md mx-auto lg:max-w-none">
              <img 
                src="/images/hero-portrait.jpg" 
                alt="Web Developer"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-xs font-mono uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

// About Section
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.about-animate')
      
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="about-animate eyebrow mb-4">About Me</p>
          <h2 className="about-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            A Skilled Developer Focused on <span className="text-gold">Your Success</span>
          </h2>
          <p className="about-animate text-muted-foreground text-lg leading-relaxed mb-8">
            I'm a passionate web developer based in Nigeria, dedicated to helping small businesses establish a powerful online presence. With years of experience in modern web technologies, I create websites that not only look stunning but also drive real results—more customers, more sales, and more growth for your business.
          </p>
          <div className="about-animate flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-muted-foreground flex items-center gap-2">
              <Code2 size={16} className="text-gold" /> Clean Code
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-muted-foreground flex items-center gap-2">
              <Palette size={16} className="text-gold" /> Modern Design
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-muted-foreground flex items-center gap-2">
              <Layout size={16} className="text-gold" /> Responsive
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section
const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.service-animate')
      
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const services = [
    {
      icon: <Globe size={32} />,
      title: 'Business Websites',
      description: 'Professional websites that establish credibility and attract customers. Perfect for service-based businesses.',
      price: 'From $100',
      features: ['1-5 Pages', 'Mobile Responsive', 'Contact Forms', 'SEO Ready']
    },
    {
      icon: <ShoppingCart size={32} />,
      title: 'E-Commerce Websites',
      description: 'Full-featured online stores with secure payment processing and inventory management.',
      price: 'From $300',
      features: ['Product Catalog', 'Payment Integration', 'Cart & Checkout', 'Order Management']
    },
    {
      icon: <RefreshCw size={32} />,
      title: 'Website Redesign',
      description: 'Transform your outdated website into a modern, high-converting digital asset.',
      price: 'From ₦200,000',
      features: ['Modern UI/UX', 'Speed Optimization', 'Mobile-First', 'Content Refresh']
    },
    {
      icon: <Layout size={32} />,
      title: 'Landing Pages',
      description: 'High-converting single pages designed to capture leads and drive specific actions.',
      price: 'From $65',
      features: ['Conversion Focused', 'A/B Testing Ready', 'Fast Loading', 'Lead Capture']
    },
  ]
  
  return (
    <section id="services" ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="service-animate eyebrow mb-4">What I Offer</p>
          <h2 className="service-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Services Built for <span className="text-gold">Your Growth</span>
          </h2>
          <p className="service-animate text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, I provide end-to-end web solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-animate card-dark-sm p-8 hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-gold font-mono text-sm mb-4">{service.price}</p>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-muted-foreground">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Section
const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.portfolio-animate')
      
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const projects = [
    {
      image: '/images/portfolio-interior.jpg',
      title: 'Luxe Interiors',
      category: 'Business Website',
      tags: ['Web Design', 'SEO', 'Booking System'],
      description: 'A premium interior design website with elegant visuals and seamless booking functionality.'
    },
    {
      image: '/images/portfolio-ecommerce.jpg',
      title: 'Fashion Hub',
      category: 'E-Commerce',
      tags: ['Shopify', 'Payment Gateway', 'Inventory'],
      description: 'Complete online fashion store with secure checkout and inventory management.'
    },
    {
      image: '/images/portfolio-business.jpg',
      title: 'Eclon Solutions',
      category: 'Corporate Website',
      tags: ['Branding', 'Web Design', 'Content Strategy'],
      description: 'Professional corporate presence that establishes authority and builds trust.'
    },
    {
      image: '/images/portfolio-landing.jpg',
      title: 'SaaS Platform',
      category: 'Landing Page',
      tags: ['UI/UX', 'Conversion Optimization', 'Analytics'],
      description: 'High-converting landing page designed for maximum signups and engagement.'
    }
  ]
  
  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="portfolio-animate eyebrow mb-4">My Work</p>
          <h2 className="portfolio-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Featured <span className="text-gold">Projects</span>
          </h2>
          <p className="portfolio-animate text-muted-foreground max-w-2xl mx-auto">
            Here are some of the websites I've built for clients across different industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="portfolio-animate card-dark-sm overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-gold font-mono text-xs uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-heading font-semibold text-xl mt-1">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Why Choose Me Section
const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.why-animate')
      
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const reasons = [
    { icon: <Zap size={28} />, title: 'Fast Delivery', description: 'Most projects completed in 1-2 weeks. No long waiting periods.' },
    { icon: <DollarSign size={28} />, title: 'Affordable Pricing', description: 'Transparent costs with no hidden fees. Quality within your budget.' },
    { icon: <Smartphone size={28} />, title: 'Mobile-Friendly', description: 'Every website looks perfect on phones, tablets, and desktops.' },
    { icon: <MessageCircle size={28} />, title: 'Great Communication', description: 'Daily updates and quick responses throughout the project.' },
  ]
  
  return (
    <section ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="why-animate eyebrow mb-4">Why Work With Me</p>
          <h2 className="why-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            The <span className="text-gold">Elite</span> Difference
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="why-animate card-dark-sm p-6 text-center hover:border-gold/30 transition-colors"
            >
              <div className="text-gold mb-4 flex justify-center">
                {reason.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{reason.title}</h3>
              <p className="text-muted-foreground text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.testimonial-animate')
      
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const testimonials = [
    {
      quote: "He understood our brand instantly. The website exceeded our expectations and our customers love the new design.",
      author: "Chidi O.",
      role: "Retail Owner"
    },
    {
      quote: "Our inquiries doubled after the redesign. Elite Web Solutions delivered exactly what we needed for our business.",
      author: "Amara T.",
      role: "Business Consultant"
    },
    {
      quote: "Fast, professional, and always on time. I recommend them to every business owner I know looking for a website.",
      author: "Ibrahim K.",
      role: "Restaurant Manager"
    },
  ]
  
  return (
    <section ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="testimonial-animate eyebrow mb-4">Testimonials</p>
          <h2 className="testimonial-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            What Clients <span className="text-gold">Say</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-animate card-dark-sm p-8 relative">
              <Quote className="text-gold/20 absolute top-6 right-6" size={32} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-heading font-semibold">{testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.pricing-animate')
      
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const packages = [
    {
      name: 'Starter',
      description: 'Perfect for new businesses',
      price: '₦150,000',
      features: [
        '1–3 pages',
        'Mobile-friendly design',
        'Contact form',
        'Social links',
        '1 week delivery'
      ],
      popular: false
    },
    {
      name: 'Business',
      description: 'For growing brands',
      price: '$185',
      features: [
        'Up to 6 pages',
        'Blog setup',
        'SEO basics',
        'Google Maps integration',
        '2 weeks support'
      ],
      popular: true
    },
    {
      name: 'E-Commerce',
      description: 'Sell online with confidence',
      price: '$300',
      features: [
        'Product catalog',
        'Cart & checkout',
        'Payment integration',
        'Order management',
        '1 month support'
      ],
      popular: false
    },
  ]
  
  return (
    <section id="pricing" ref={sectionRef} className="relative bg-dark py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="pricing-animate eyebrow mb-4">Pricing</p>
          <h2 className="pricing-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Clear Pricing. <span className="text-gold">No Surprises.</span>
          </h2>
          <p className="pricing-animate text-muted-foreground max-w-2xl mx-auto">
            Choose a package that fits your stage. You can always upgrade as you grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`pricing-animate card-dark-sm p-8 relative ${pkg.popular ? 'border-gold/50' : ''}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-dark text-xs font-mono uppercase px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading font-semibold text-xl mb-1">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
              <p className="font-heading font-bold text-3xl text-gold mb-6">{pkg.price}</p>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://wa.me/2348037985366"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-full font-medium transition-all ${
                  pkg.popular 
                    ? 'bg-gold text-dark hover:bg-[#E5C158]' 
                    : 'border border-gold text-gold hover:bg-gold hover:text-dark'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        
        <p className="pricing-animate text-center text-muted-foreground text-sm mt-8">
          Custom projects available on request. <a href="#contact" className="text-gold hover:underline">Let's discuss your needs</a>
        </p>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.contact-animate')
      
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    }, section)
    
    return () => ctx.revert()
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', budget: '', message: '' })
    }, 1500)
  }
  
  return (
    <section id="contact" ref={sectionRef} className="relative bg-dark-secondary py-20 lg:py-32">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="text-center mb-12 lg:mb-16">
          <p className="contact-animate eyebrow mb-4">Get In Touch</p>
          <h2 className="contact-animate font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Let's Build <span className="text-gold">Something Great</span>
          </h2>
          <p className="contact-animate text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Reach out and I'll get back to you within 24 hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="contact-animate card-dark p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-gold" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                      placeholder="0803 798 5366"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select budget</option>
                      <option value="100-150">$100 - $150</option>
                      <option value="150-250">$150 - $250</option>
                      <option value="250-400">$250 - $400</option>
                      <option value="400+">$400+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold-solid flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact Details */}
          <div className="contact-animate space-y-6">
            <div className="card-dark p-8">
              <h3 className="font-heading font-semibold text-xl mb-6">Contact Details</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:ogeziemmanuel519@gmail.com" className="text-foreground hover:text-gold transition-colors">
                      ogeziemmanuel519@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:+2348037985366" className="text-foreground hover:text-gold transition-colors">
                      +234 803 798 5366
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="card-dark p-8 border-gold/30">
              <h3 className="font-heading font-semibold text-xl mb-3">Prefer WhatsApp?</h3>
              <p className="text-muted-foreground text-sm mb-5">
                Chat with me directly for quick questions or to get started right away.
              </p>
              <a 
                href="https://wa.me/2348037985366"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-solid flex items-center justify-center gap-2 w-full"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-dark py-12 border-t border-white/5">
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <a href="#" className="font-heading font-bold text-2xl">
              Elite<span className="text-gold">Web</span>Solutions
            </a>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-muted-foreground text-sm">
              © 2026 Elite Web Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground text-sm hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground text-sm hover:text-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="relative bg-dark min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content - Vertical Scroll */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}

export default App
