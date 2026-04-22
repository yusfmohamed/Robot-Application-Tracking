import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// hook for delivery API interaction
import { useDelivery } from '../hooks/useDelivery';

// const PICKUP_OPTIONS = ['Aisle 3B', 'Aisle 1A', 'Aisle 2C', 'Warehouse A', 'Warehouse B'];
const DESTINATION_OPTIONS = ['Station 1', 'Station 2'];

export default function DeliveryScreen({ navigation, route }) {
  const { selectedItems = [] } = route.params || {};
  const itemCount = selectedItems.length;

  const [pickupOpen, setPickupOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState('Aisle 3B');
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // use the delivery hook to send requests
  const { sendRequest, loading, error } = useDelivery();
  
  const handlePickup = (option) => {
    setSelectedPickup(option);
    setPickupOpen(false);
  };

  const handleDestination = (option) => {
    setSelectedDestination(option);
    setDestinationOpen(false);
  };

  const handleSendRequest = async () => {
    if (!selectedDestination) return;
    const result = await sendRequest(selectedDestination, itemCount);
    if (result) {
      navigation.navigate('Animation');  // only on success
    } else {
      // Show error to user (you can add a toast/alert here)
      console.log('❌ Delivery request failed:', error);
    }
  };

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
        <Text style={styles.headerTitle}>Delivery Request</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Location Card */}
        <View style={styles.card}>

 
          <View style={styles.divider} />

          {/* Delivery Destination Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setDestinationOpen(!destinationOpen); setPickupOpen(false); }}
          >
            <Text style={[styles.dropdownText, !selectedDestination && styles.dropdownPlaceholder]}>
              {selectedDestination || 'Delivery Destination'}
            </Text>
            <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <Path d="M1 1L6 6L11 1" stroke="#7AAAC8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>

          {destinationOpen && (
            <View style={styles.dropdownList}>
              {DESTINATION_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.dropdownItem, selectedDestination === option && styles.dropdownItemActive]}
                  onPress={() => handleDestination(option)}
                >
                  <Text style={[styles.dropdownItemText, selectedDestination === option && styles.dropdownItemTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        </View>

        {/* Robot Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/delievery.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

      </ScrollView>

      {/* Send Request Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.sendBtn, (!selectedDestination || loading) && styles.sendBtnDisabled]}
          activeOpacity={0.85}
          disabled={!selectedDestination || loading}
          onPress={handleSendRequest}
        >
          <Text style={styles.sendText}>{loading ? 'Sending...' : 'Send Request'}</Text>
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

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 18,
    marginBottom: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A3550',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
    marginVertical: 10,
  },

  // Dropdown
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#FAFCFE',
  },
  dropdownText: {
    fontSize: 15,
    color: '#1A3550',
    fontWeight: '500',
  },
  dropdownPlaceholder: {
    color: '#A0C4D8',
    fontWeight: '400',
  },
  dropdownList: {
    marginTop: 6,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownItemActive: {
    backgroundColor: '#EAF4FB',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#7AAAC8',
  },
  dropdownItemTextActive: {
    color: '#1A3550',
    fontWeight: '600',
  },

  // Robot image
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 600,
    backgroundColor: '#DFF0FA',
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },

  // Footer
  footer: {
    padding: 20,
    paddingBottom: 10,
  },
  sendBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#A0C4D8',
  },
  sendText: {
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