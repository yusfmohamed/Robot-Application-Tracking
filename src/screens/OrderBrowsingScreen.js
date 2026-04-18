import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, TextInput,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const CATEGORIES = ['All', 'Robots', 'Parts', 'Tools'];

const ITEMS = [
  {
    id: 1,
    name: 'ECM Module',
    units: 38,
    weight: '1.8 kg',
    price: '$100',
    description: 'Engine control module used for controlling the engine\'s performance and efficiency. Essential for modern automated systems.',
    image: require('../../assets/item1.png'),
    category: 'Parts',
  },
  {
    id: 2,
    name: 'Wrench',
    units: 8,
    weight: '1 kg',
    price: '$25',
    description: 'Heavy-duty industrial wrench designed for high-torque applications. Compatible with all standard bolt sizes used in robotic assembly.',
    image: require('../../assets/item2.png'),
    category: 'Tools',
  },
  {
    id: 3,
    name: 'Hard Drive',
    units: 18,
    weight: '1.8 kg',
    price: '$75',
    description: 'High-capacity storage unit built for industrial environments. Stores operational logs, navigation data, and system configurations.',
    image: require('../../assets/item3.png'),
    category: 'Parts',
  },
];

export default function PayloadBrowsingScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState([]);

  const filteredItems = ITEMS.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAdd = (id) => {
    setAdded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedItems = ITEMS.filter(item => added.includes(item.id));
    navigation.navigate('PayloadDetails', { selectedItems });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <Path d="M8 2L2 8L8 14" stroke="#5B8DB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Browsing</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Svg width="16" height="16" viewBox="0 0 20 20">
          <Circle cx="9" cy="9" r="7" stroke="#7AAAC8" strokeWidth="1.5" fill="none" />
          <Path d="M14 14L18 18" stroke="#7AAAC8" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A0C4D8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
          >
            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item, index) => (
          <View key={item.id}>
            <View style={styles.itemRow}>
              <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnits}>U: {item.units}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemWeight}>{item.weight}</Text>
                <TouchableOpacity
                  style={[styles.addBtn, added.includes(item.id) && styles.addBtnActive]}
                  onPress={() => handleAdd(item.id)}
                >
                  <Text style={styles.addBtnText}>
                    {added.includes(item.id) ? '✓ Added' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {index < filteredItems.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, added.length === 0 && styles.confirmBtnDisabled]}
          activeOpacity={0.85}
          disabled={added.length === 0}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>
            Confirm Payload {added.length > 0 ? `(${added.length})` : ''}
          </Text>
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
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 16,
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A3550',
  },
  categoryRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 4,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryBtnActive: {
    backgroundColor: '#EAF4FB',
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
  },
  categoryText: {
    fontSize: 13,
    color: '#7AAAC8',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#1A3550',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  itemImage: {
    width: 70,
    height: 70,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A3550',
    marginBottom: 4,
  },
  itemUnits: {
    fontSize: 13,
    color: '#7AAAC8',
  },
  itemRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  itemWeight: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A3550',
  },
  addBtn: {
    backgroundColor: '#A0C4D8',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  addBtnActive: {
    backgroundColor: '#5B8DB8',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
    marginHorizontal: 16,
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#EAF4FB',
  },
  confirmBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    backgroundColor: '#A0C4D8',
  },
  confirmText: {
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