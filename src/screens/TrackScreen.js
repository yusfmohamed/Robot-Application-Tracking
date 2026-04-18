import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function TrackScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <Path d="M8 2L2 8L8 14" stroke="#5B8DB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Robot tracking</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        {/* Robot Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image3.png')}
            style={styles.robotImage}
            resizeMode="cover"
          />
        </View>

        {/* Status */}
        <Text style={styles.statusTitle}>En Route to Pickup</Text>
        <Text style={styles.statusSub}>Delivering Package…</Text>

        <View style={styles.divider} />

        {/* Row 1 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Aisle 3B</Text>
          <Text style={styles.infoValue}>3 kg</Text>
          <View style={styles.badgeBlue}>
            <Text style={styles.badgeText}>SNACKS</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Row 2 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Station 2E</Text>
          <Text style={styles.infoValue}>2 Pkg</Text>
          <View style={styles.badgeRed}>
            <Text style={styles.badgeText}>FRAGILE</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Live Cam */}
        <Text style={styles.liveCam}>Live Cam</Text>

        <View style={styles.divider} />

        {/* Estimated time */}
        <View style={styles.etaRow}>
          <Text style={styles.etaLabel}>Estimated Delivery Time</Text>
          <Text style={styles.etaValue}>2–3 min</Text>
        </View>

      </View>

      {/* Cancel Delivery */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.85}>
          <Text style={styles.cancelText}>Cancel Delivery</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A3550',
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    backgroundColor: '#C8DDF0',
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3550',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statusSub: {
    fontSize: 13,
    color: '#7AAAC8',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1A3550',
  },
  infoValue: {
    fontSize: 14,
    color: '#1A3550',
    marginRight: 8,
  },
  badgeBlue: {
    backgroundColor: '#5B8DB8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeRed: {
    backgroundColor: '#C8DFF0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  liveCam: {
    fontSize: 14,
    color: '#7AAAC8',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F0F6FB',
  },
  etaLabel: {
    fontSize: 14,
    color: '#7AAAC8',
  },
  etaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A3550',
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
  },
  cancelBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: '#C8DFF0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
});