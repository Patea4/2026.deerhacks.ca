import Image from 'next/image'

import styles from '@/styles/logo.module.css'

type Props = {
  onAnimationEnd?: () => void
  pulse?: boolean
}

const AnimatedLogo = (props: Props) => {
  const { onAnimationEnd, pulse = true } = props

  return (
    <Image
      src="/deerhacks_logo_no_bg.png"
      alt="DeerHacks logo"
      width={192}
      height={192}
      className={pulse ? styles.pulse : undefined}
      style={{ width: '12rem', height: '12rem' }}
      priority
      onAnimationEnd={() => onAnimationEnd?.()}
    />
  )
}

export default AnimatedLogo
