import Head from 'next/head'
import { ReactNode } from 'react'

import Starfield from './Starfield'
import CelestialNavbar from './CelestialNavbar'
import Footer from './Footer'

type Props = {
  children: ReactNode
  title: string
  showFooter?: boolean
}

const CelestialLayout = ({ children, title, showFooter = true }: Props) => {
  return (
    <>
      <Head>
        <title>{title} | DeerHacks</title>
      </Head>
      <main className="celestial-theme relative min-h-screen bg-background overflow-x-hidden">
        <Starfield />

        {/* Hero gradient background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div style={{ background: 'var(--gradient-hero)', height: '100%' }} />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-space-nebula/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px]" />
          </div>
        </div>

        <CelestialNavbar />

        <div className="relative z-10 pt-24 pb-16 min-h-screen">
          {children}
        </div>

        {showFooter && <Footer />}
      </main>
    </>
  )
}

export default CelestialLayout
