import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTranslations } from '../i18n';
import { Button } from '../components/Button';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { profile, updateProfile } = useUserProfile();
  const { t } = useTranslations();

  const [weight, setWeight] = useState(profile.weight?.toString() || '');
  const [height, setHeight] = useState(profile.height?.toString() || '');
  const [age, setAge] = useState(profile.age?.toString() || '');
  const [sex, setSex] = useState<'male' | 'female' | 'other' | undefined>(profile.sex);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    // Validation
    if (weight && (isNaN(weightNum) || weightNum <= 0 || weightNum > 500)) {
      Alert.alert(t.profile, 'Please enter a valid weight (1-500 kg)');
      return;
    }

    if (height && (isNaN(heightNum) || heightNum <= 0 || heightNum > 300)) {
      Alert.alert(t.profile, 'Please enter a valid height (1-300 cm)');
      return;
    }

    if (age && (isNaN(ageNum) || ageNum <= 0 || ageNum > 120)) {
      Alert.alert(t.profile, 'Please enter a valid age (1-120 years)');
      return;
    }

    setSaving(true);

    const success = await updateProfile({
      weight: weight ? weightNum : undefined,
      height: height ? heightNum : undefined,
      age: age ? ageNum : undefined,
      sex: sex,
    });

    setSaving(false);

    if (success) {
      Alert.alert(
        t.profile,
        'Profile saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert(t.profile, 'Failed to save profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.userProfile}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>{t.profileIncomplete}</Text>
          <Text style={styles.infoDescription}>
            {t.profileIncompleteDescription}
          </Text>
        </View>

        {/* Weight */}
        <View style={styles.section}>
          <Text style={styles.label}>{t.weight}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="70"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
            <Text style={styles.unit}>{t.kg}</Text>
          </View>
        </View>

        {/* Height */}
        <View style={styles.section}>
          <Text style={styles.label}>{t.height}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="175"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
            <Text style={styles.unit}>{t.cm}</Text>
          </View>
        </View>

        {/* Age */}
        <View style={styles.section}>
          <Text style={styles.label}>{t.age}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="30"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
            />
            <Text style={styles.unit}>{t.years}</Text>
          </View>
        </View>

        {/* Sex */}
        <View style={styles.section}>
          <Text style={styles.label}>{t.sex}</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[
                styles.sexButton,
                sex === 'male' && styles.sexButtonSelected,
              ]}
              onPress={() => setSex('male')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  sex === 'male' && styles.sexButtonTextSelected,
                ]}
              >
                {t.male}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexButton,
                sex === 'female' && styles.sexButtonSelected,
              ]}
              onPress={() => setSex('female')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  sex === 'female' && styles.sexButtonTextSelected,
                ]}
              >
                {t.female}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexButton,
                sex === 'other' && styles.sexButtonSelected,
              ]}
              onPress={() => setSex('other')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  sex === 'other' && styles.sexButtonTextSelected,
                ]}
              >
                {t.other}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <Button
          title={t.save}
          onPress={handleSave}
          size="large"
          style={styles.saveButton}
          disabled={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  infoBanner: {
    backgroundColor: colors.workTint,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 20,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    paddingVertical: 16,
  },
  unit: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 12,
  },
  sexButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sexButton: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 18,
    alignItems: 'center',
  },
  sexButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sexButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sexButtonTextSelected: {
    color: colors.textLight,
  },
  saveButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});
