import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export default function AnimationScreen({ navigation }) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <Path
              d="M8 2L2 8L8 14"
              stroke="#5B8DB8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>

        {/* Lottie Animation */}
        <LottieView
          ref={animationRef}
          source={require('../../assets/animation.json')}
          style={styles.animation}
          autoPlay
          loop={false}
          onAnimationFinish={() => console.log('Animation done')}
        />

        {/* Text */}
        <Text style={styles.title}>Request Sent!</Text>
        <Text style={styles.subtitle}>
          Your delivery request has been placed successfully. The robot is on its way!
        </Text>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoDot} />
            <Text style={styles.infoText}>Estimated arrival: 2–3 min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoDot} />
            <Text style={styles.infoText}>Robot is being dispatched</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoDot} />
            <Text style={styles.infoText}>You will be notified on arrival</Text>
          </View>
        </View>

      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.trackBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Track')}
        >
          <Text style={styles.trackText}>Track Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeText}>Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FB',
  },

  // Header
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Content
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  // Lottie
  animation: {
    width: 280,
    height: 280,
  },

  // Text
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A3550',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7AAAC8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  // Info card
  infoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  infoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5B8DB8',
  },
  infoText: {
    fontSize: 14,
    color: '#1A3550',
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
  },

  // Footer
  footer: {
    padding: 20,
    paddingBottom: 10,
    gap: 10,
  },
  trackBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  trackText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  homeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
  },
  homeText: {
    color: '#5B8DB8',
    fontSize: 16,
    fontWeight: '600',
  },
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: '#C8DFF0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
});