import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppSettings } from '../context/AppSettingsContext';
import { SUPPORTED_LANGUAGES } from '../languages';
import { APP_THEMES } from '../constants/themes';
import { FONT_SIZE_OPTIONS } from '../constants/fontSize';
import { ThemedText } from '../components/ThemedText';
import { ThemedCard } from '../components/ThemedCard';
import { ThemedButton } from '../components/ThemedButton';

export default function HomeScreen() {
  const router = useRouter();
  const {
    language,
    theme,
    khmerFont,
    englishFont,
    fontSizeKey,
    translations,
    setLanguage,
    setThemeId,
    setFontSizeKey,
    scale,
  } = useAppSettings();

  const [sandboxText, setSandboxText] = useState('');
  const [sandboxBold, setSandboxBold] = useState(false);
  const [sandboxFontType, setSandboxFontType] = useState<'auto' | 'km' | 'en'>('auto');

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Bar */}
          <View style={styles.topBar}>
            <View>
              <View style={[styles.badge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="sparkles" size={13} color={theme.colors.primary} />
                <ThemedText
                  bold
                  style={{
                    color: theme.colors.badgeText,
                    fontSize: scale(11),
                    marginLeft: 5,
                  }}
                >
                  {translations.home.templateBadge}
                </ThemedText>
              </View>
              <ThemedText variant="hero" bold style={{ marginTop: 6 }}>
                {translations.home.welcomeTitle}
              </ThemedText>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/settings')}
              style={[
                styles.settingsIconButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.cardBorder,
                  shadowColor: theme.isDark ? '#000000' : '#64748B',
                },
              ]}
              accessibilityLabel="Open Settings"
            >
              <Ionicons name="settings-sharp" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <ThemedText variant="body" colorType="secondary" style={styles.subtitle}>
            {translations.home.welcomeSubtitle}
          </ThemedText>

          {/* Active Configuration Overview Card */}
          <ThemedCard style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <Ionicons name="cube-outline" size={18} color={theme.colors.primary} />
              <ThemedText variant="subheading" bold style={{ marginLeft: 8 }}>
                {translations.home.systemOverview}
              </ThemedText>
            </View>

            <View style={styles.overviewGrid}>
              <View style={[styles.overviewItem, { backgroundColor: theme.colors.surface }]}>
                <ThemedText variant="caption" colorType="muted">
                  {translations.home.activeTheme}
                </ThemedText>
                <View style={styles.overviewItemValue}>
                  <View style={[styles.colorDot, { backgroundColor: theme.colors.primary }]} />
                  <ThemedText bold numberOfLines={1} style={{ fontSize: scale(13), flex: 1 }}>
                    {theme.name}
                  </ThemedText>
                </View>
              </View>

              <View style={[styles.overviewItem, { backgroundColor: theme.colors.surface }]}>
                <ThemedText variant="caption" colorType="muted">
                  {translations.home.activeLanguage}
                </ThemedText>
                <ThemedText bold style={{ fontSize: scale(13), marginTop: 4 }}>
                  {language.toUpperCase()} •{' '}
                  {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}
                </ThemedText>
              </View>

              <View style={[styles.overviewItem, { backgroundColor: theme.colors.surface }]}>
                <ThemedText variant="caption" colorType="muted">
                  {translations.home.activeKhmerFont}
                </ThemedText>
                <ThemedText
                  bold
                  forceLanguage="km"
                  style={{ fontSize: scale(13), marginTop: 4, color: theme.colors.primary }}
                >
                  {khmerFont.name} ({khmerFont.nativeName})
                </ThemedText>
              </View>

              <View style={[styles.overviewItem, { backgroundColor: theme.colors.surface }]}>
                <ThemedText variant="caption" colorType="muted">
                  {translations.home.activeEnglishFont}
                </ThemedText>
                <ThemedText
                  bold
                  forceLanguage="en"
                  style={{ fontSize: scale(13), marginTop: 4, color: theme.colors.primary }}
                >
                  {englishFont.name}
                </ThemedText>
              </View>
            </View>

            <View style={[styles.scaleRow, { borderTopColor: theme.colors.border }]}>
              <ThemedText variant="caption" colorType="muted">
                {translations.home.activeFontSize}:
              </ThemedText>
              <ThemedText bold colorType="accent" style={{ marginLeft: 6 }}>
                {fontSizeKey.toUpperCase()} (
                {FONT_SIZE_OPTIONS.find((f) => f.key === fontSizeKey)?.percentage})
              </ThemedText>
            </View>
          </ThemedCard>

          {/* Quick Language Switcher */}
          <View style={styles.quickSection}>
            <ThemedText variant="subheading" bold style={{ marginBottom: 10 }}>
              {translations.common.language} (i18n)
            </ThemedText>
            <View style={styles.quickPills}>
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => setLanguage(lang.code)}
                    style={[
                      styles.langPill,
                      {
                        backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                      },
                    ]}
                  >
                    <ThemedText style={{ fontSize: scale(16), marginRight: 6 }}>
                      {lang.flag}
                    </ThemedText>
                    <ThemedText
                      bold={isSelected}
                      style={{
                        color: isSelected ? '#FFFFFF' : theme.colors.text,
                        fontSize: scale(13),
                      }}
                    >
                      {lang.nativeName}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quick Theme Switcher (Top 5 popular themes) */}
          <View style={styles.quickSection}>
            <View style={styles.sectionTitleRow}>
              <ThemedText variant="subheading" bold>
                {translations.common.theme}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <ThemedText variant="caption" colorType="primary" bold>
                  10 Themes →
                </ThemedText>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeSlider}>
              {APP_THEMES.map((th) => {
                const isSelected = theme.id === th.id;
                return (
                  <TouchableOpacity
                    key={th.id}
                    onPress={() => setThemeId(th.id)}
                    style={[
                      styles.quickThemeItem,
                      {
                        backgroundColor: th.colors.surface,
                        borderColor: isSelected ? th.colors.primary : th.colors.cardBorder,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                  >
                    <View style={[styles.circleSwatch, { backgroundColor: th.colors.primary }]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                    <ThemedText
                      bold={isSelected}
                      numberOfLines={1}
                      style={{
                        fontSize: scale(11),
                        color: th.colors.text,
                        marginTop: 4,
                      }}
                    >
                      {th.name}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Interactive Live Typography Sandbox */}
          <View style={styles.quickSection}>
            <ThemedText variant="subheading" bold style={{ marginBottom: 4 }}>
              {translations.home.interactivePreview}
            </ThemedText>
            <ThemedText variant="caption" colorType="muted" style={{ marginBottom: 12 }}>
              {translations.home.inputPlaceholder}
            </ThemedText>

            <ThemedCard style={styles.sandboxCard}>
              <View style={styles.sandboxControls}>
                {/* Font selector switcher */}
                <View style={styles.sandboxToggleGroup}>
                  <TouchableOpacity
                    onPress={() => setSandboxFontType('auto')}
                    style={[
                      styles.toggleBtn,
                      sandboxFontType === 'auto' && { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <ThemedText
                      bold={sandboxFontType === 'auto'}
                      style={{
                        color: sandboxFontType === 'auto' ? '#FFFFFF' : theme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      Auto
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSandboxFontType('km')}
                    style={[
                      styles.toggleBtn,
                      sandboxFontType === 'km' && { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <ThemedText
                      bold={sandboxFontType === 'km'}
                      forceLanguage="km"
                      style={{
                        color: sandboxFontType === 'km' ? '#FFFFFF' : theme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      Khmer ({khmerFont.name})
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSandboxFontType('en')}
                    style={[
                      styles.toggleBtn,
                      sandboxFontType === 'en' && { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <ThemedText
                      bold={sandboxFontType === 'en'}
                      forceLanguage="en"
                      style={{
                        color: sandboxFontType === 'en' ? '#FFFFFF' : theme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      English ({englishFont.name})
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                {/* Bold toggle */}
                <TouchableOpacity
                  onPress={() => setSandboxBold(!sandboxBold)}
                  style={[
                    styles.boldToggleBtn,
                    {
                      backgroundColor: sandboxBold ? theme.colors.primary : theme.colors.surface,
                      borderColor: sandboxBold ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <ThemedText
                    bold
                    style={{
                      color: sandboxBold ? '#FFFFFF' : theme.colors.text,
                      fontSize: scale(12),
                    }}
                  >
                    B
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <TextInput
                multiline
                placeholder={translations.home.inputPlaceholder}
                placeholderTextColor={theme.colors.textPlaceholder}
                value={sandboxText}
                onChangeText={setSandboxText}
                style={[
                  styles.sandboxInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                    fontSize: scale(15),
                    fontFamily:
                      sandboxFontType === 'km'
                        ? sandboxBold && khmerFont.bold
                          ? khmerFont.bold
                          : khmerFont.regular
                        : sandboxFontType === 'en'
                        ? sandboxBold && englishFont.bold
                          ? englishFont.bold
                          : englishFont.regular
                        : undefined,
                  },
                ]}
              />

              {/* Sample Quick Insert Pills */}
              <View style={styles.samplePillsRow}>
                <TouchableOpacity
                  onPress={() => setSandboxText(translations.samples.khmerQuote)}
                  style={[styles.samplePill, { backgroundColor: theme.colors.surface }]}
                >
                  <ThemedText variant="caption" forceLanguage="km">
                    + គំរូអក្សរខ្មែរ
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSandboxText(translations.samples.englishQuote)}
                  style={[styles.samplePill, { backgroundColor: theme.colors.surface }]}
                >
                  <ThemedText variant="caption" forceLanguage="en">
                    + English sample
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSandboxText(translations.samples.chineseQuote)}
                  style={[styles.samplePill, { backgroundColor: theme.colors.surface }]}
                >
                  <ThemedText variant="caption">
                    + 中文范例文
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedCard>
          </View>

          {/* Full Settings CTA */}
          <ThemedButton
            title={translations.home.openSettingsButton}
            variant="primary"
            size="large"
            onPress={() => router.push('/settings')}
            icon={<Ionicons name="options-outline" size={20} color="#FFFFFF" />}
            style={{ marginTop: 10, marginBottom: 30 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  settingsIconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
  },
  overviewCard: {
    marginBottom: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  overviewItem: {
    width: '48%',
    borderRadius: 10,
    padding: 10,
  },
  overviewItemValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 10,
  },
  quickSection: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickPills: {
    flexDirection: 'row',
    gap: 10,
  },
  langPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeSlider: {
    flexDirection: 'row',
  },
  quickThemeItem: {
    width: 90,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  circleSwatch: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sandboxCard: {
    padding: 14,
  },
  sandboxControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sandboxToggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 8,
    padding: 2,
    flex: 1,
    marginRight: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  boldToggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  sandboxInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  samplePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  samplePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
});
