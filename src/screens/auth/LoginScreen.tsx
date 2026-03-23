import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInputWithLabel, Typography } from '~components';
import { environments } from '~data/constants/environment.constants';
import { authService } from '~services/auth.services';
import { useAuth } from '~utils/tokenHandling';

export const LoginScreen = () => {
  const { theme, login: setSession, isDarkMode, toggleTheme } = useAuth();
  

  const [email, setEmail] = useState(environments.defaultUser.email);
  const [password, setPassword] = useState(environments.defaultUser.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    const response = await authService.login(email, password);

    if (response.status === 'success') {
      await setSession();
    } else {
      setError(response.message || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <FontAwesome5 
            name={isDarkMode ? 'sun' : 'moon'} 
            size={20} 
            color={theme.primary} 
          />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <View style={[styles.logoContainer, { backgroundColor: theme.primary }]}>
            <FontAwesome5 name="rocket" size={40} color={theme.textOnPrimary} />
          </View>
          <Typography font="displaySmallBold" color="textPrimary" style={styles.title}>
            VendaRapido Demo
          </Typography>
          <Typography font="titleMediumRegular" color="textSecondary">
            Bienvenido de nuevo.
          </Typography>
        </View>

        <View style={styles.formSection}>
          {error ? (
            <Typography color="error" font="bodySmallBold" style={styles.errorText}>
              {error || ''}
            </Typography>
          ) : null}

          <TextInputWithLabel
            label="Correo electrónico"
            placeholder="admin@vendarapido.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<FontAwesome5 name="envelope" size={20} color={theme.textSecondary} />}
            required
          />

          <TextInputWithLabel
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            icon={<FontAwesome5 name="lock" size={20} color={theme.textSecondary} />}
            required
          />

          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.textOnPrimary} />
            ) : (
              <Typography color="textOnPrimary" font="titleMediumBold">
                Iniciar sesión
              </Typography>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Typography color="textSecondary" font="bodySmallRegular">
            Al ingresar aceptas nuestros términos y condiciones.
          </Typography>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    // Sombra para el logo
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 5,
  },
  formSection: {
    width: '100%',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  }
});