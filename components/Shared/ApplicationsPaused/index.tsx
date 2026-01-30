import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

type Props = {
  showBackButton?: boolean
  buttonText?: string
  buttonLink?: string
}

const ApplicationsPaused = (props: Props) => {
  const { showBackButton = true, buttonText = 'Go Back', buttonLink = '/dashboard' } = props

  return (
    <>
      <Head>
        <title>Applications Paused | DeerHacks</title>
      </Head>
      <FullPageLoader
        show
        pulse={false}
        text="Applications are temporarily paused while we review things. Please check back in a few moments."
        {...(showBackButton && { buttonText, buttonLink })}
      />
    </>
  )
}

export default ApplicationsPaused
