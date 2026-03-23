import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { environments } from '~data/constants/environment.constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '~utils/tokenHandling';
import { HeaderCart, Typography } from '~components';

export const ProfileScreen = () => {
  const { theme, isDarkMode, toggleTheme, logout } = useAuth();
  const user = environments.defaultUser;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderCart title="Mi Perfil" showCart={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Typography font="titleLargeBold" color="textPrimary">{user.name}</Typography>
            <Typography font="bodyMediumRegular" color="textSecondary">{user.email}</Typography>
          </View>
        </View>

        <Typography font="titleMediumBold" color="primary" style={styles.sectionTitle}>
          Tema
        </Typography>
        
        <View style={[styles.optionsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: theme.primaryLight }]}>
                <FontAwesome5 name={isDarkMode ? 'moon' : 'sun'} size={16} color={theme.primary} />
              </View>
              <Typography font="bodyMediumBold" color="textPrimary">Modo Oscuro</Typography>
            </View>
            
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme}
              trackColor={{ false: theme.outline, true: theme.primaryLight }}
              thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>


        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: theme.error }]} 
          onPress={logout}
        >
          <FontAwesome5 name="sign-out-alt" size={18} color={theme.error} style={{ marginRight: 10 }} />
          <Typography font="titleMediumBold" color="error">Cerrar Sesión</Typography>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Typography font="labelSmallRegular" color="textSecondary">
            {environments.projectName || ''} {environments.version || ''}
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  profileCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: { flex: 1 },
  sectionTitle: {
    marginLeft: 5,
    marginBottom: 10,
    letterSpacing: 1,
  },
  optionsCard: {
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  }
});