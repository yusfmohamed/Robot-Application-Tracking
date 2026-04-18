import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

export default function HomeScreen({ route, navigation }) {
  const { username } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Welcome, <Text style={styles.name}>{username}</Text>
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Svg width="16" height="16" viewBox="0 0 20 20">
          <Circle cx="9" cy="9" r="7" stroke="#7AAAC8" strokeWidth="1.5" fill="none" />
          <Path d="M14 14L18 18" stroke="#7AAAC8" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
        <Text style={styles.searchText}>Search shipments…</Text>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Image
          source={require('../../assets/home.png')}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Section Label */}
      <View style={styles.sectionRow}>
        <Svg width="18" height="18" viewBox="0 0 20 20">
          <Path d="M3 10L10 3L17 10V17H13V13H7V17H3V10Z" fill="#5B8DB8" />
        </Svg>
        <Text style={styles.sectionLabel}>Home Dashboard</Text>
      </View>

      {/* Payload Card */}
      <TouchableOpacity
        style={styles.payloadCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('PayloadBrowsing')}
      >
        <View style={styles.payloadIllustration}>
          <Image
            source={require('../../assets/payload.png')}
            style={styles.payloadImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.payloadAction}>
          <Text style={styles.payloadLabel}>New Payload</Text>
          <View style={styles.chevronCircle}>
            <Svg width="10" height="10" viewBox="0 0 10 10">
              <Path d="M3 1.5L7 5L3 8.5" stroke="#5B8DB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </Svg>
          </View>
        </View>
      </TouchableOpacity>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>24</Text>
          <Text style={styles.statLabel}>Active shipments</Text>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>+3 today</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>98%</Text>
          <Text style={styles.statLabel}>On-time delivery</Text>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>excellent</Text>
          </View>
        </View>
      </View>

{/* Tab Bar */}
<View style={styles.tabBar}>
  <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home', { username })}>
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <Path d="M3 10L10 3L17 10V17H13V13H7V17H3V10Z" fill="#5B8DB8" />
    </Svg>
    <Text style={styles.tabLabelActive}>Home</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Track', { username })}>
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <Rect x="3" y="3" width="14" height="14" rx="3" stroke="#A0C4D8" strokeWidth="1.5" fill="none" />
      <Path d="M7 10h6M10 7v6" stroke="#A0C4D8" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
    <Text style={styles.tabLabel}>Track</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile', { username, email: route.params.email })}>
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <Circle cx="10" cy="8" r="4" stroke="#A0C4D8" strokeWidth="1.5" fill="none" />
      <Path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#A0C4D8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </Svg>
    <Text style={styles.tabLabel}>Profile</Text>
  </TouchableOpacity>
</View>

      {/* Home indicator */}
      <View style={styles.homeIndicator} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FB',
  },
  content: {
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A3550',
  },
  name: {
    color: '#5B8DB8',
    fontWeight: 'bold',
  },

  // Search
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 14,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  searchText: {
    fontSize: 14,
    color: '#A0C4D8',
  },

  // Hero Banner
  heroBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
    height: 160,
    backgroundColor: '#C8DDF0',
  },
  heroBannerImage: {
    width: '120%',
    height: '120%',
    alignSelf: 'center',
  },

  // Section label
  sectionRow: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A3550',
  },

  // Payload card
  payloadCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    overflow: 'hidden',
  },
  payloadIllustration: {
    height: 150,
    backgroundColor: '#E8F4FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payloadImage: {
    width: '90%',
    height: '100%',
  },
  payloadAction: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payloadLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A3550',
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAF4FB',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats
  statsRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 14,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1A3550',
  },
  statLabel: {
    fontSize: 12,
    color: '#7AAAC8',
    marginTop: 2,
  },
  statBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#E1F5EE',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statBadgeText: {
    fontSize: 10,
    color: '#0F6E56',
  },

  // Tab bar
  tabBar: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    color: '#A0C4D8',
  },
  tabLabelActive: {
    fontSize: 10,
    color: '#5B8DB8',
  },

  // Home indicator
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: '#C8DFF0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 20,
  },
});