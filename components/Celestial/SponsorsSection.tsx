import { Star, Mail } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const sponsors = [
  { name: 'Uber', placeholder: false },
  { name: 'University of Toronto', placeholder: false },
  { name: 'iCube UTM', placeholder: false },
  { name: 'Major League Hacking', placeholder: false },
  { name: 'AWS', placeholder: false },
  { name: 'echo3D', placeholder: false },
  { name: 'BIGDataAIHub @ IMI', placeholder: false },
  { name: 'StandOut Stickers', placeholder: false },
  { name: 'Silver Spoon', placeholder: false },
  { name: 'Thirstea', placeholder: false },
]

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-24 sm:py-32 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Previously Sponsored</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Previously <span className="text-gradient">Sponsored</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;re grateful to these organizations for their past support of DeerHacks.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="glass-card flex items-center justify-center border border-border/60 transition-all duration-300 group hover:-translate-y-1 w-40 sm:w-52 h-20 sm:h-24 rounded-xl"
            >
              <span className="font-display text-muted-foreground group-hover:text-foreground transition-colors text-sm sm:text-base text-center px-3">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block rounded-2xl p-8 border border-border/60">
            <p className="text-foreground font-display font-medium mb-2">
              Interested in sponsoring DeerHacks?
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Partner with us to reach 500+ talented developers.
            </p>
            <a
              href="mailto:mcss@utmsu.ca"
              className={`${getButtonClassName('constellation', 'lg')} no-underline inline-flex`}
            >
              <Mail className="w-4 h-4" />
              <span>Become a Sponsor</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
