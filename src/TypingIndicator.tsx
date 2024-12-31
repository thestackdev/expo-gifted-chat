import React, { useEffect, useState, useMemo } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Color from './Color'

const DotsAnimation = () => {
  const dot1 = useMemo(() => new Animated.Value(0), [])
  const dot2 = useMemo(() => new Animated.Value(0), [])
  const dot3 = useMemo(() => new Animated.Value(0), [])

  const topY = useMemo(() => -5, [])
  const bottomY = useMemo(() => 5, [])
  const duration = useMemo(() => 500, [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: topY,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(dot1, {
          toValue: bottomY,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [dot1, topY, bottomY, duration])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(100),
        Animated.timing(dot2, {
          toValue: topY,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: bottomY,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [dot2, topY, bottomY, duration])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(dot3, {
          toValue: topY,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: bottomY,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [dot3, topY, bottomY, duration])

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
    </View>
  )
}

interface Props {
  isTyping?: boolean
}

const TypingIndicator = ({ isTyping }: Props) => {
  const yCoords = useMemo(() => new Animated.Value(200), [])
  const heightScale = useMemo(() => new Animated.Value(0), [])
  const marginScale = useMemo(() => new Animated.Value(0), [])

  const [isVisible, setIsVisible] = useState(isTyping)

  const slideIn = () => {
    const duration = 250

    Animated.parallel([
      Animated.timing(yCoords, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const slideOut = () => {
    const duration = 250

    Animated.parallel([
      Animated.timing(yCoords, {
        toValue: 200,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished)
        setIsVisible(false)
    })
  }

  useEffect(() => {
    if (isVisible)
      if (isTyping)
        slideIn()
      else
        slideOut()
  }, [isVisible, isTyping])

  useEffect(() => {
    if (isTyping)
      setIsVisible(true)
  }, [isTyping])

  if (!isVisible)
    return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: yCoords }],
          height: heightScale,
          marginBottom: marginScale,
        },
      ]}
    >
      <DotsAnimation />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    width: 45,
    borderRadius: 15,
    backgroundColor: Color.leftBubbleBackground,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    width: 8,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
})

export default TypingIndicator
