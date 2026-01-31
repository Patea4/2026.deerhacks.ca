import CelestialLayout from '@/components/Celestial/CelestialLayout'

const SchedulePage = () => {
  return (
    <CelestialLayout title="Schedule" showFooter={false}>
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-24">
        <div className="max-w-xl text-center glass-card rounded-3xl border border-border/60 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Schedule Coming Soon
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            The DeerHacks schedule isn&apos;t ready yet. Check back closer to the event for the
            full lineup of workshops, activities, and announcements.
          </p>
        </div>
      </main>
    </CelestialLayout>
  )
}

export default SchedulePage
