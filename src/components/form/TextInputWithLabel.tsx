import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { fonts } from '~themes/fonts';
import { ColorPalette } from '~data/interfaces/color.interfaces';
import { useAuth } from '~utils/tokenHandling';
import { Typography } from '~components';

interface TextInputProps {
  label: string;
  icon?: React.ReactNode;
  colorText?: keyof ColorPalette;
  maxLength?: number;
  placeholder?: string;
  keyboardType?: string;
  multiline?: boolean;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
  error?: boolean;
  required?: boolean;
  value?: string;
  editable?: boolean;
}

export const TextInputWithLabel = ({
  label,
  icon,
  colorText = 'textPrimary',
  maxLength,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  onChangeText = () => {},
  secureTextEntry = false,
  error = false,
  required = false,
  value = '',
  editable = true,
}: TextInputProps) => {
  
  const { theme } = useAuth();

  return (
    <View style={styles.inputContainer}>
      <Typography
        color={colorText}
        font="titleMediumRegular"
        style={styles.label}>
        {label}
        {required && (
          <Typography color="primary" font="titleMediumBold">
            {' '}*
          </Typography>
        )}
      </Typography>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: theme.outline,
            backgroundColor: theme.surface 
           },
          // eslint-disable-next-line react-native/no-inline-styles
          error ? { borderColor: theme.error, borderWidth: 1.5 } : null,
          // eslint-disable-next-line react-native/no-inline-styles
          !editable ? { backgroundColor: theme.surface, opacity: 0.6 } : null,
        ]}>
        
        {icon && (
          <View style={styles.icon}>
            {icon}
          </View>
        )}

        <TextInput
          autoCapitalize="sentences"
          autoCorrect={true}
          keyboardType={keyboardType as any}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            { 
              color: theme.textPrimary, 
              backgroundColor: theme.surface,
              ...fonts.bodyMediumRegular
            },
           { height: 50 },
          ]}
          placeholderTextColor={theme.textSecondary}
          value={value}
          editable={editable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});