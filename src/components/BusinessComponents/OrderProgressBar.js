import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import * as Animatable from 'react-native-animatable'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function OrderProgressBar({ status }) {
  const [activeLineIndex, setActiveLineIndex] = useState(0)

  const statusOrders = {
    created: "created",
    accepted: "accepted",
    pickup: "pickup",
    store: "store",
    taken: "taken",
    picked: "picked",
    delivering: "delivering",
    arrived: "arrived",
    completed: "completed"
  }

  const PROGRESS_LINES = [
    [statusOrders.created, statusOrders.accepted, statusOrders.pickup],
    [statusOrders.store, statusOrders.taken, statusOrders.picked],
    [statusOrders.delivering],
    [statusOrders.arrived],
  ];

  // Determine which line is active based on the current status
  useEffect(() => {
    for (let i = 0; i < PROGRESS_LINES.length; i++) {
      if (PROGRESS_LINES[i].includes(status)) {
        setActiveLineIndex(i);
        break;
      }
    }
  }, [status]);

  // Define a custom animation for the loader effect
  Animatable.initializeRegistryWithDefinitions({
    loaderAnimation: {
      0: { left: '-50%', opacity: 0 },
      0.1: { left: '-40%', opacity: 1 },
      0.9: { left: '90%', opacity: 1 },
      1: { left: '100%', opacity: 0 }
    }
  });

  return (
    <View style={styles.container}>
      {PROGRESS_LINES.map((_, index) => (
        <View key={index} style={styles.lineContainer}>
          {index === activeLineIndex ? (
            <View style={styles.activeLineContainer}>
              <Animatable.View
                style={styles.loaderBar}
                animation="loaderAnimation"
                iterationCount="infinite"
                duration={1800}
                easing="linear"
              />
            </View>
          ) : index < activeLineIndex ? (
            <View style={[styles.line, styles.completedLine]} />
          ) : (
            <View style={[styles.line, styles.inactiveLine]} />
          )}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  lineContainer: {
    flex: 1,
    height: hp(0.8),
    marginHorizontal: wp(0.5),
    borderRadius: hp(0.4),
    overflow: 'hidden',
    backgroundColor: theme_colors.lightGrey,
  },
  activeLineContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  loaderBar: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: theme_colors.primary,
    borderRadius: hp(0.4),
  },
  line: {
    height: '100%',
    borderRadius: hp(0.4),
  },
  completedLine: {
    width: '100%',
    backgroundColor: theme_colors.primary,
  },
  inactiveLine: {
    width: '0%',
    backgroundColor: theme_colors.primary,
  }
});