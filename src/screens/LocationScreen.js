import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const COUNTRIES = ['Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Jordan'];
const CITIES = {
  Egypt: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah'],
  Kuwait: ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya'],
  Qatar: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor'],
  Jordan: ['Amman', 'Zarqa', 'Irbid', 'Aqaba'],
};

export default function LocationScreen({ navigation }) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setCountryOpen(false);
  };

  const handleCity = (city) => {
    setSelectedCity(city);
    setCityOpen(false);
  };

  const isComplete = selectedCountry && selectedCity && street && zipCode;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

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
        <Text style={styles.headerTitle}>Location</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Location Pin Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#5B8DB8"
                opacity="0.2"
              />
              <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                stroke="#5B8DB8"
                strokeWidth="1.5"
                fill="none"
              />
              <Circle cx="12" cy="9" r="2.5" fill="#5B8DB8" />
            </Svg>
          </View>
          <Text style={styles.iconTitle}>Set Your Location</Text>
          <Text style={styles.iconSub}>Fill in your delivery address details</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>

          {/* Country Dropdown */}
          <Text style={styles.fieldLabel}>Country</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setCountryOpen(!countryOpen); setCityOpen(false); }}
          >
            <Text style={[styles.dropdownText, !selectedCountry && styles.placeholder]}>
              {selectedCountry || 'Select Country'}
            </Text>
            <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <Path
                d="M1 1L6 6L11 1"
                stroke="#7AAAC8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          {countryOpen && (
            <View style={styles.dropdownList}>
              {COUNTRIES.map(country => (
                <TouchableOpacity
                  key={country}
                  style={[styles.dropdownItem, selectedCountry === country && styles.dropdownItemActive]}
                  onPress={() => handleCountry(country)}
                >
                  <Text style={[styles.dropdownItemText, selectedCountry === country && styles.dropdownItemTextActive]}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.fieldDivider} />

          {/* City Dropdown */}
          <Text style={styles.fieldLabel}>City</Text>
          <TouchableOpacity
            style={[styles.dropdown, !selectedCountry && styles.dropdownDisabled]}
            onPress={() => {
              if (!selectedCountry) return;
              setCityOpen(!cityOpen);
              setCountryOpen(false);
            }}
          >
            <Text style={[styles.dropdownText, !selectedCity && styles.placeholder]}>
              {selectedCity || (selectedCountry ? 'Select City' : 'Select a country first')}
            </Text>
            <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <Path
                d="M1 1L6 6L11 1"
                stroke="#7AAAC8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          {cityOpen && selectedCountry && (
            <View style={styles.dropdownList}>
              {CITIES[selectedCountry].map(city => (
                <TouchableOpacity
                  key={city}
                  style={[styles.dropdownItem, selectedCity === city && styles.dropdownItemActive]}
                  onPress={() => handleCity(city)}
                >
                  <Text style={[styles.dropdownItemText, selectedCity === city && styles.dropdownItemTextActive]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.fieldDivider} />

          {/* Street */}
          <Text style={styles.fieldLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 12 El Tahrir Street"
            placeholderTextColor="#A0C4D8"
            value={street}
            onChangeText={setStreet}
          />

          <View style={styles.fieldDivider} />

          {/* Zip Code */}
          <Text style={styles.fieldLabel}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 11511"
            placeholderTextColor="#A0C4D8"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />

        </View>

        {/* Summary card if filled */}
        {isComplete && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="#5B8DB8"
                  opacity="0.3"
                />
                <Circle cx="12" cy="9" r="2.5" fill="#5B8DB8" />
              </Svg>
              <Text style={styles.summaryText}>
                {street}, {selectedCity}, {selectedCountry} {zipCode}
              </Text>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveBtn, !isComplete && styles.saveBtnDisabled]}
          activeOpacity={0.85}
          disabled={!isComplete}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>Save Location</Text>
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>

    </KeyboardAvoidingView>
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

  // Icon section
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3550',
    marginBottom: 4,
  },
  iconSub: {
    fontSize: 13,
    color: '#7AAAC8',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 18,
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7AAAC8',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldDivider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
    marginVertical: 16,
  },

  // Dropdown
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F6FB',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  dropdownText: {
    fontSize: 15,
    color: '#1A3550',
    fontWeight: '500',
  },
  placeholder: {
    color: '#A0C4D8',
    fontWeight: '400',
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 12,
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

  // Input
  input: {
    backgroundColor: '#F0F6FB',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A3550',
  },

  // Summary
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 14,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    color: '#1A3550',
    lineHeight: 20,
  },

  // Footer
  footer: {
    padding: 20,
    paddingBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#A0C4D8',
  },
  saveText: {
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