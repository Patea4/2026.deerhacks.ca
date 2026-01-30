import NextLink from 'next/link'

import { Calendar, MapPin, Users, Sparkles } from 'lucide-react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'

import DeerConstellation from './DeerConstellation'
import { getButtonClassName } from './buttonStyles'

const HeroSection = () => {
  const { toggles } = useFeatureToggle()
  const applyLabel = 'Apply Now'
  const applyEnabled = toggles.dashboard
  const applyClassName = getButtonClassName(
    'hero',
    'xl',
    applyEnabled ? '' : 'pointer-events-none opacity-50'
  )
  const secondaryClassName = getButtonClassName('constellation', 'xl')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--gradient-hero)' }} />

      {/* Nebula effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-space-nebula/25 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Deer Constellation - Made more prominent */}
          <div
            className="mb-6 sm:mb-10 opacity-0 animate-fade-in relative"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Glow effect behind constellation */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] scale-150" />
            <DeerConstellation />
          </div>

          {/* Event badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">February 27 - March 1, 2026</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-gradient">DeerHacks</span>
          </h1>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-display font-light text-foreground/90 mb-6 opacity-0 animate-fade-in-up tracking-wide"
            style={{ animationDelay: '0.5s' }}
          >
            UTM&apos;s Premier Hackathon
          </p>

          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl opacity-0 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: '0.6s' }}
          >
            Join 500+ innovators for 36 hours of building, learning, and creating.
            Explore the universe of possibilities.
          </p>

          {/* Event details */}
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">University of Toronto Mississauga</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">36 Hours</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">500+ Hackers</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.9s' }}
          >
            {applyEnabled ? (
              <NextLink href="/login" className={`${applyClassName} no-underline`}>
                {applyLabel}
              </NextLink>
            ) : (
              <span className={applyClassName} aria-disabled="true">
                {applyLabel}
              </span>
            )}
            <a href="#about" className={`${secondaryClassName} no-underline`}>
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: '1.5s' }}
      >
        <a href="#about" className="block group" aria-label="Scroll to learn more">
          <div className="w-6 h-10 border-2 border-muted-foreground/40 group-hover:border-primary/60 rounded-full flex justify-center transition-colors">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  )
}

export default HeroSection
