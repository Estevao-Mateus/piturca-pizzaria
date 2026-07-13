'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Animation variants for different effects
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0 },
}

// Reusable components for scroll animations
export interface ScrollAnimationProps {
  children: ReactNode
  variant?: keyof typeof animationVariants
  duration?: number
  delay?: number
  staggerChildren?: boolean
  className?: string
}

const animationVariants = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  rotateIn,
}

export function ScrollAnimation({
  children,
  variant = 'fadeInUp',
  duration = 0.6,
  delay = 0,
  className = '',
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={animationVariants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered container for animating multiple children
export function ScrollAnimationGroup({
  children,
  variant = 'fadeInUp',
  staggerDelay = 0.1,
  className = '',
}: {
  children: ReactNode
  variant?: keyof typeof animationVariants
  staggerDelay?: number
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual child for use within ScrollAnimationGroup
export function ScrollAnimationItem({
  children,
  variant = 'fadeInUp',
  duration = 0.6,
  className = '',
}: Omit<ScrollAnimationProps, 'staggerChildren'>) {
  return (
    <motion.div
      variants={animationVariants[variant]}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
