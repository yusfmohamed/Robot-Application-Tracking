import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function PayloadDetailsScreen({ route, navigation }) {
  const { selectedItems } = route.params;

  const totalWeight = selectedItems
    .reduce((sum, item) => sum + parseFloat(item.weight), 0)
    .toFixed(1);

  const totalPrice = selectedItems
    .reduce((sum, item) => sum + parseInt(item.price.replace('$', '')), 0);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <Path d="M8 2L2 8L8 14" stroke="#5B8DB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payload Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Items Card */}
        <View style={styles.card}>

          {/* Images Row */}
          <View style={styles.imagesRow}>
            {selectedItems.map(item => (
              <Image
                key={item.id}
                source={item.image}
                style={styles.itemImage}
                resizeMode="contain"
              />
            ))}
          </View>

          {/* Name + Price */}
          <View style={styles.nameRow}>
            <Text style={styles.itemName}>
              {selectedItems.length === 1
                ? selectedItems[0].name
                : `${selectedItems.length} Items`}
            </Text>
            <Text style={styles.itemPrice}>${totalPrice}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min((totalWeight / 10) * 100, 100)}%` }]} />
          </View>

          {/* Quantity + Weight */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Quantity: {selectedItems.length}</Text>
            <Text style={styles.metaText}>{totalWeight} kg</Text>
          </View>

        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.descriptionCard}>
          {selectedItems.map((item, index) => (
            <View key={item.id}>
              {selectedItems.length > 1 && (
                <Text style={styles.descItemName}>{item.name}</Text>
              )}
              <Text style={styles.descriptionText}>{item.description}</Text>
              {index < selectedItems.length - 1 && <View style={styles.descDivider} />}
            </View>
          ))}
        </View>

        {/* Total Weight */}
        <View style={styles.totalWeightRow}>
          <Text style={styles.totalWeightLabel}>Total Payload Weight</Text>
          <Text style={styles.totalWeightValue}>{totalWeight} kg</Text>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Delivery')}
        >
          <Text style={styles.confirmText}>Confirm</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 20,
    marginBottom: 20,
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3550',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A3550',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E0EEF8',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5B8DB8',
    borderRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 14,
    color: '#7AAAC8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7AAAC8',
    marginBottom: 10,
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    padding: 16,
    marginBottom: 14,
    minHeight: 120,
  },
  descItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B8DB8',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A7A9B',
    lineHeight: 22,
  },
  descDivider: {
    height: 0.5,
    backgroundColor: '#C8DFF0',
    marginVertical: 10,
  },
  totalWeightRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#C8DFF0',
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalWeightLabel: {
    fontSize: 15,
    color: '#7AAAC8',
  },
  totalWeightValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3550',
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
  },
  confirmBtn: {
    backgroundColor: '#5B8DB8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
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