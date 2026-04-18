import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export default function ProfileScreen({ route, navigation }) {
  const { username, email } = route.params;

  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <Path d="M8 2L2 8L8 14" stroke="#5B8DB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      {/* Name + Email */}
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeIndicator} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FB',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C8DDF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5B8DB8',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3550',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#7AAAC8',
    marginBottom: 30,
  },
  menuContainer: {
    width: '85%',
    gap: 10,
  },
  menuItem: {
    backgroundColor: '#E8F0F8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A3550',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E24B4A',
  },
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: '#C8DFF0',
    borderRadius: 2,
    position: 'absolute',
    bottom: 16,
  },
});