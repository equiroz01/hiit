import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTranslations } from '../i18n';

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

type AuthMode = 'signIn' | 'signUp' | 'resetPassword';

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { signIn, signUp, signInAnonymously, resetPassword, loading } = useAuth();
  const { t } = useTranslations();

  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setProcessing(true);
    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        Alert.alert('Sign In Failed', error.message);
      } else {
        // Success - navigation handled by auth state change
        navigation.goBack();
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setProcessing(true);
    try {
      const { error } = await signUp(email.trim(), password);
      if (error) {
        Alert.alert('Sign Up Failed', error.message);
      } else {
        Alert.alert(
          'Success!',
          'Account created successfully. Please check your email to confirm your account.',
          [{ text: 'OK', onPress: () => setMode('signIn') }]
        );
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setProcessing(true);
    try {
      const { error } = await resetPassword(email.trim());
      if (error) {
        Alert.alert('Reset Failed', error.message);
      } else {
        Alert.alert(
          'Success!',
          'Password reset email sent. Please check your inbox.',
          [{ text: 'OK', onPress: () => setMode('signIn') }]
        );
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleContinueAsGuest = async () => {
    setProcessing(true);
    try {
      const { error } = await signInAnonymously();
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        navigation.goBack();
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = () => {
    switch (mode) {
      case 'signIn':
        handleSignIn();
        break;
      case 'signUp':
        handleSignUp();
        break;
      case 'resetPassword':
        handleResetPassword();
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === 'signIn'
                ? t.signIn
                : mode === 'signUp'
                ? t.createAccount
                : t.resetPassword}
            </Text>
            <Text style={styles.subtitle}>
              {mode === 'signIn'
                ? 'Sign in to sync your workouts across devices'
                : mode === 'signUp'
                ? 'Create an account to backup and sync your data'
                : 'Enter your email to receive a password reset link'}
            </Text>
          </View>

          {/* Benefits Banner (only for sign up) */}
          {mode === 'signUp' && (
            <View style={styles.benefitsCard}>
              <Text style={styles.benefitsTitle}>{t.syncBenefits}</Text>
              <BenefitItem icon="☁️" text="Cloud backup of all workouts" />
              <BenefitItem icon="🔄" text="Sync across all your devices" />
              <BenefitItem icon="🔒" text="Secure and private" />
              <BenefitItem icon="📊" text="Access your data anywhere" />
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t.email}</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!processing}
              />
            </View>

            {/* Password Input (not for reset) */}
            {mode !== 'resetPassword' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t.password}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!processing}
                />
              </View>
            )}

            {/* Confirm Password (only for sign up) */}
            {mode === 'signUp' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t.confirmPassword}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!processing}
                />
              </View>
            )}

            {/* Forgot Password Link (only for sign in) */}
            {mode === 'signIn' && (
              <TouchableOpacity
                onPress={() => setMode('resetPassword')}
                disabled={processing}
              >
                <Text style={styles.forgotPassword}>{t.forgotPassword}</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, processing && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={processing}
              activeOpacity={0.8}
            >
              {processing ? (
                <ActivityIndicator color={colors.textLight} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {mode === 'signIn'
                    ? t.signIn
                    : mode === 'signUp'
                    ? t.createAccount
                    : t.resetPassword}
                </Text>
              )}
            </TouchableOpacity>

            {/* Mode Toggle */}
            {mode !== 'resetPassword' && (
              <View style={styles.modeToggle}>
                <Text style={styles.modeToggleText}>
                  {mode === 'signIn' ? t.dontHaveAccount : t.alreadyHaveAccount}
                </Text>
                <TouchableOpacity
                  onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
                  disabled={processing}
                >
                  <Text style={styles.modeToggleLink}>
                    {mode === 'signIn' ? t.signUp : t.signIn}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Back to Sign In (for reset password) */}
            {mode === 'resetPassword' && (
              <TouchableOpacity
                style={styles.backToSignIn}
                onPress={() => setMode('signIn')}
                disabled={processing}
              >
                <Text style={styles.backToSignInText}>← {t.back}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Divider */}
          {mode === 'signIn' && (
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
          )}

          {/* Continue as Guest (only for sign in) */}
          {mode === 'signIn' && (
            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleContinueAsGuest}
              disabled={processing}
              activeOpacity={0.8}
            >
              <Text style={styles.guestButtonText}>{t.continueAsGuest}</Text>
              <Text style={styles.guestButtonSubtext}>
                No account needed • Data stored locally
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Benefit Item Component
const BenefitItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.benefitItem}>
    <Text style={styles.benefitIcon}>{icon}</Text>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  benefitsCard: {
    backgroundColor: colors.workTint,
    borderRadius: borderRadius.xl,
    padding: 20,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.sm,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    ...shadows.sm,
  },
  forgotPassword: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: 18,
    alignItems: 'center',
    ...shadows.primary,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 0.5,
  },
  modeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  modeToggleText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  modeToggleLink: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  backToSignIn: {
    alignItems: 'center',
    marginTop: 24,
  },
  backToSignInText: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '700',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  guestButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 18,
    alignItems: 'center',
    ...shadows.sm,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  guestButtonSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
