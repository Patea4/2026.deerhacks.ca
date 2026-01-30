import { Star, Mail } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const sponsors = {
  platinum: [
    { name: 'Uber', placeholder: false },
    { name: 'University of Toronto', placeholder: false },
  ],
  gold: [
    { name: 'iCube UTM', placeholder: false },
    { name: 'Major League Hacking', placeholder: false },
    { name: 'AWS', placeholder: false },
  ],
  silver: [
    { name: 'echo3D', placeholder: false },
    { name: 'BIGDataAIHub @ IMI', placeholder: false },
    { name: 'StandOut Stickers', placeholder: false },
    { name: 'Silver Spoon', placeholder: false },
    { name: 'Thirstea', placeholder: false },
  ],
}

const tierStyles = {
  platinum: {
    label: 'Platinum Sponsors',
    labelColor: 'text-primary',
    cardClass: 'w-72 h-36 rounded-2xl border-primary/30 hover:border-primary/60 bg-primary/5',
    textClass: 'text-xl',
  },
  gold: {
    label: 'Gold Sponsors',
    labelColor: 'text-accent',
    cardClass: 'w-52 h-28 rounded-xl border-accent/30 hover:border-accent/60 bg-accent/5',
    textClass: 'text-lg',
  },
  silver: {
    label: 'Silver Sponsors',
    labelColor: 'text-muted-foreground',
    cardClass: 'w-44 h-24 rounded-lg border-border/50 hover:border-primary/40',
    textClass: 'text-base',
  },
}

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-24 sm:py-32 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-gradient">Stellar</span> Partners
          </h2>
          <p className="text-lg text-muted-foreground">
            These amazing organizations make DeerHacks possible. We&apos;re grateful for their support.
          </p>
        </div>

        <div className="space-y-12">
          {/* Platinum tier */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/30" />
              <h3 className={`text-sm uppercase tracking-widest font-display font-semibold ${tierStyles.platinum.labelColor}`}>
                {tierStyles.platinum.label}
              </h3>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/30" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {sponsors.platinum.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className={`glass-card flex items-center justify-center border transition-all duration-300 group hover:-translate-y-1 ${tierStyles.platinum.cardClass}`}
                >
                  <span className={`font-display text-muted-foreground group-hover:text-foreground transition-colors ${tierStyles.platinum.textClass}`}>
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gold tier */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-accent/30" />
              <h3 className={`text-sm uppercase tracking-widest font-display font-semibold ${tierStyles.gold.labelColor}`}>
                {tierStyles.gold.label}
              </h3>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-accent/30" />
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {sponsors.gold.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className={`glass-card flex items-center justify-center border transition-all duration-300 group hover:-translate-y-1 ${tierStyles.gold.cardClass}`}
                >
                  <span className={`font-display text-muted-foreground group-hover:text-foreground transition-colors ${tierStyles.gold.textClass}`}>
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Silver tier */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-border/50" />
              <h3 className={`text-sm uppercase tracking-widest font-display ${tierStyles.silver.labelColor}`}>
                {tierStyles.silver.label}
              </h3>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-border/50" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {sponsors.silver.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className={`glass-card flex items-center justify-center border transition-all duration-300 group hover:-translate-y-1 ${tierStyles.silver.cardClass}`}
                >
                  <span className={`font-display text-muted-foreground group-hover:text-foreground transition-colors ${tierStyles.silver.textClass}`}>
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
