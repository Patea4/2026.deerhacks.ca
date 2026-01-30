import { useState } from 'react'

import { Calendar, Clock, MapPin, User, ChevronDown, X } from 'lucide-react'

import CelestialLayout from '@/components/Celestial/CelestialLayout'
import { useToast } from '@/contexts/Toast'
import { useEventList } from '@/hooks/Event/useEventList'
import Error500Page from '@/pages/500'
import { Event, EventHosts, ParsedEventData } from '@/types/Event'

type ScheduleProps = {
  parsedEvents: ParsedEventData
}

const hostNames: { [key in EventHosts]: string } = {
  deerhacks: 'DeerHacks',
  mcss: 'MCSS',
  utmRobotics: 'UTM Robotics',
  esports: 'Esports',
  gdsc: 'GDSC',
  cssc: 'CSSC',
  utmsam: 'UTMSAM',
  guidewire: 'Guidewire',
  inworldAi: 'Inworld AI',
  uber: 'Uber',
  amd: 'AMD',
  mlh: 'MLH',
  thirstea: 'ThirsTEA',
}

const typeColors: Record<string, string> = {
  workshop: 'bg-primary/20 text-primary border-primary/30',
  activity: 'bg-accent/20 text-accent border-accent/30',
  food: 'bg-green-500/20 text-green-400 border-green-500/30',
  main: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ceremony: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  logistics: 'bg-muted text-muted-foreground border-border',
}

const EventModal = ({
  event,
  onClose,
}: {
  event: Event
  onClose: () => void
}) => {
  const startTime = event.attributes.actualEventTimes
    ? event.attributes.actualEventTimes.startTime
    : event.attributes.startTime
  const endTime = event.attributes.actualEventTimes
    ? event.attributes.actualEventTimes.endTime
    : event.attributes.endTime

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-border/60 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'radial-gradient(circle closest-corner at 62% 60%, rgba(212, 175, 55, 0.15), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 75% 16%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(87, 65, 174, 0.15), rgba(255, 255, 255, 0) 76%), linear-gradient(hsl(222 40% 8%), hsl(222 40% 8%))',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          type="button"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`text-xs px-3 py-1 rounded-full border ${
                typeColors[event.attributes.type] || typeColors.logistics
              }`}
            >
              {event.attributes.type.charAt(0).toUpperCase() +
                event.attributes.type.slice(1)}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              {hostNames[event.attributes.host] ?? event.attributes.host}
            </span>
          </div>

          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            {event.attributes.title}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                {startTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                {endTime &&
                  !isNaN(endTime.getTime()) &&
                  ' - ' +
                    endTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
              </span>
            </div>

            {event.attributes.location && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.attributes.location}</span>
              </div>
            )}

            {event.attributes.presenter && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="w-4 h-4 text-primary" />
                <span>{event.attributes.presenter}</span>
              </div>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {event.attributes.description}
          </p>
        </div>
      </div>
    </div>
  )
}

const Schedule = ({ parsedEvents }: ScheduleProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const days = Object.keys(parsedEvents).sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
  )

  const now = new Date()

  const [tabIndex, setTabIndex] = useState(() => {
    const index = days.findIndex((day) => {
      const date = new Date(day)
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      )
    })
    return index !== -1 ? index : 0
  })

  const currentDay = days[tabIndex]
  const dayData = parsedEvents[currentDay]

  // Get all events for the current day, sorted by start time
  const allEvents = dayData?.hours
    .flatMap((hour) => hour.eventsStarting)
    .sort(
      (a, b) =>
        a.attributes.startTime.getTime() - b.attributes.startTime.getTime()
    ) || []

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 opacity-0 animate-fade-in-up">
            <span className="text-gradient">Event</span> Schedule
          </h1>
          <p
            className="text-lg text-muted-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Your mission timeline for DeerHacks 2026. Events are subject to
            change.
          </p>
        </div>

        {/* Day Tabs */}
        <div
          className="flex justify-center gap-3 sm:gap-4 mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {days.map((day, index) => {
            const eventDate = new Date(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  setTabIndex(index)
                }}
                className={`px-4 sm:px-6 py-3 rounded-xl font-display font-medium transition-all duration-300 cursor-pointer ${
                  tabIndex === index
                    ? 'bg-primary text-primary-foreground glow-gold'
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 border border-border/50'
                }`}
              >
                <span className="block text-sm sm:text-base">
                  {eventDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </span>
                <span className="block text-xs opacity-70">
                  {eventDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </button>
            )
          })}
        </div>

        {/* Current Day Header */}
        <div
          className="text-center mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-display font-medium">
              {new Date(currentDay).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Events List */}
        <div
          className="max-w-3xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[60px] sm:left-[80px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border/30" />

            <div className="space-y-4">
              {allEvents.map((event) => {
                const isImportant = event.attributes.important

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full flex gap-4 sm:gap-6 group text-left transition-all duration-300 hover:translate-x-1 ${
                      isImportant ? 'scale-[1.02]' : ''
                    }`}
                  >
                    {/* Time */}
                    <div className="w-14 sm:w-20 text-right text-sm text-muted-foreground font-mono shrink-0 pt-3">
                      {event.attributes.startTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>

                    {/* Timeline dot */}
                    <div className="relative pt-4">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ring-2 ring-background transition-all ${
                          isImportant
                            ? 'bg-primary ring-primary/20 star-glow'
                            : 'bg-muted-foreground group-hover:bg-primary group-hover:ring-primary/20'
                        }`}
                      />
                    </div>

                    {/* Event card */}
                    <div
                      className={`flex-1 glass-card px-4 py-3 rounded-xl border transition-all ${
                        isImportant
                          ? 'border-primary/40 bg-primary/5 hover:border-primary/60'
                          : 'border-border/60 hover:border-primary/40'
                      }`}
                      style={
                        isImportant
                          ? {
                              background:
                                'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1), transparent 50%), hsl(222 40% 8% / 0.6)',
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-display font-medium truncate ${
                              isImportant ? 'text-primary' : 'text-foreground'
                            }`}
                          >
                            {event.attributes.title}
                          </h4>
                          {event.attributes.location && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">
                                {event.attributes.location}
                              </span>
                            </p>
                          )}
                        </div>

                        <span
                          className={`text-xs px-2 py-1 rounded-full shrink-0 border ${
                            typeColors[event.attributes.type] ||
                            typeColors.logistics
                          }`}
                        >
                          {event.attributes.type}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  )
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
    <p className="text-muted-foreground font-display">Loading schedule...</p>
  </div>
)

const SchedulePage = () => {
  const { setToast } = useToast()
  const { data, isLoading, isError } = useEventList({
    onSuccess: () => {
      setToast({
        type: 'info',
        message:
          'Note: Events are subject to change & any last minute changes will also be announced on Discord.',
      })
    },
  })

  if (isError) return <Error500Page />

  return (
    <CelestialLayout title="Schedule" showFooter={false}>
      {isLoading || !data ? (
        <LoadingSpinner />
      ) : (
        <Schedule parsedEvents={data.parsedData} />
      )}
    </CelestialLayout>
  )
}

export default SchedulePage
