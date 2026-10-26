import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSettings } from '../../context/AppSettingsContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../languages';
import { APP_THEMES } from '../../constants/themes';
import { KHMER_FONTS, ENGLISH_FONTS } from '../../constants/fonts';
import { FONT_SIZE_OPTIONS, FontSizeKey } from '../../constants/fontSize';
import { ThemedText } from '../../components/ThemedText';
import { ThemedCard } from '../../components/ThemedCard';
import { ThemedButton } from '../../components/ThemedButton';
import { Header } from '../../components/Header';

type SettingsTab = 'all' | 'language' | 'theme' | 'fonts' | 'size';

export default function SettingsScreen() {
  const {
    language,
    themeId,
    khmerFontId,
    englishFontId,
    fontSizeKey,
    theme,
    translations,
    setLanguage,
    setThemeId,
    setKhmerFontId,
    setEnglishFontId,
    setFontSizeKey,
    resetToDefaults,
    scale,
  } = useAppSettings();

  const [activeTab, setActiveTab] = useState<SettingsTab>('all');

  const handleReset = () => {
    Alert.alert(
      translations.common.reset,
      translations.common.resetConfirm,
      [
        { text: translations.common.close, style: 'cancel' },
        {
          text: translations.common.reset,
          style: 'destructive',
          onPress: async () => {
            await resetToDefaults();
            Alert.alert(translations.common.done, translations.common.resetSuccess);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title={translations.settings.title}
        subtitle={translations.settings.subtitle}
        showBack
        rightAction={
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.resetHeaderBtn, { backgroundColor: theme.colors.surface }]}
            accessibilityLabel="Reset"
          >
            <Ionicons name="refresh-outline" size={20} color={theme.colors.danger} />
          </TouchableOpacity>
        }
      />

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { borderBottomColor: theme.colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBarContent}
        >
          {(
            [
              { key: 'all', label: translations.common.settings, icon: 'grid-outline' },
              { key: 'language', label: translations.common.language, icon: 'globe-outline' },
              { key: 'theme', label: translations.common.theme, icon: 'color-palette-outline' },
              { key: 'fonts', label: translations.common.typography, icon: 'text-outline' },
              { key: 'size', label: translations.common.fontSize, icon: 'resize-outline' },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                    borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                  },
                ]}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={15}
                  color={isSelected ? '#FFFFFF' : theme.colors.textMuted}
                  style={{ marginRight: 6 }}
                />
                <ThemedText
                  bold={isSelected}
                  style={{
                    color: isSelected ? '#FFFFFF' : theme.colors.text,
                    fontSize: scale(13),
                  }}
                >
                  {tab.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= 1. LANGUAGE (i18n) ================= */}
        {(activeTab === 'all' || activeTab === 'language') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="language" size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.sectionTitleWrap}>
                <ThemedText variant="subheading" bold>
                  {translations.settings.languageSectionTitle}
                </ThemedText>
                <ThemedText variant="caption" colorType="muted">
                  {translations.settings.languageSectionDesc}
                </ThemedText>
              </View>
            </View>

            <View style={styles.grid2}>
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    activeOpacity={0.8}
                    onPress={() => setLanguage(lang.code)}
                    style={[
                      styles.langCard,
                      {
                        backgroundColor: isSelected ? theme.colors.surface : theme.colors.card,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                  >
                    <View style={styles.langCardHeader}>
                      <ThemedText style={{ fontSize: scale(28) }}>{lang.flag}</ThemedText>
                      {isSelected ? (
                        <View style={[styles.checkCircle, { backgroundColor: theme.colors.primary }]}>
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View style={[styles.radioCircle, { borderColor: theme.colors.border }]} />
                      )}
                    </View>
                    <ThemedText variant="subheading" bold style={{ marginTop: 8 }}>
                      {lang.nativeName}
                    </ThemedText>
                    <ThemedText variant="caption" colorType="muted">
                      {lang.name}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ================= 2. THEMES (10 PALETTES) ================= */}
        {(activeTab === 'all' || activeTab === 'theme') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="color-palette" size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.sectionTitleWrap}>
                <ThemedText variant="subheading" bold>
                  {translations.settings.themeSectionTitle}
                </ThemedText>
                <ThemedText variant="caption" colorType="muted">
                  {translations.settings.themeSectionDesc}
                </ThemedText>
              </View>
            </View>

            <View style={styles.themeGrid}>
              {APP_THEMES.map((th) => {
                const isSelected = themeId === th.id;
                const localized =
                  th.localizedName[language as keyof typeof th.localizedName] || th.name;

                return (
                  <TouchableOpacity
                    key={th.id}
                    activeOpacity={0.8}
                    onPress={() => setThemeId(th.id)}
                    style={[
                      styles.themeCard,
                      {
                        backgroundColor: th.colors.surface,
                        borderColor: isSelected ? th.colors.primary : th.colors.cardBorder,
                        borderWidth: isSelected ? 2.5 : 1,
                        shadowColor: th.isDark ? '#000000' : '#64748B',
                      },
                    ]}
                  >
                    {/* Color Swatch Bar */}
                    <View style={styles.swatchBar}>
                      <View style={[styles.swatchItem, { backgroundColor: th.colors.primary }]} />
                      <View style={[styles.swatchItem, { backgroundColor: th.colors.secondary }]} />
                      <View style={[styles.swatchItem, { backgroundColor: th.colors.accent }]} />
                      <View style={[styles.swatchItem, { backgroundColor: th.colors.background }]} />
                    </View>

                    <View style={styles.themeCardBottom}>
                      <View style={{ flex: 1 }}>
                        <ThemedText
                          bold={isSelected}
                          numberOfLines={1}
                          style={{
                            color: th.colors.text,
                            fontSize: scale(13),
                          }}
                        >
                          {localized}
                        </ThemedText>
                        <ThemedText
                          variant="caption"
                          style={{
                            color: th.colors.textMuted,
                            fontSize: scale(11),
                          }}
                        >
                          {th.isDark ? 'Dark Mode' : 'Light Mode'}
                        </ThemedText>
                      </View>

                      {isSelected ? (
                        <View style={[styles.checkCircleSmall, { backgroundColor: th.colors.primary }]}>
                          <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                        </View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ================= 3. FONT SIZING & SCALE ================= */}
        {(activeTab === 'all' || activeTab === 'size') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="resize" size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.sectionTitleWrap}>
                <ThemedText variant="subheading" bold>
                  {translations.settings.fontSizeSectionTitle}
                </ThemedText>
                <ThemedText variant="caption" colorType="muted">
                  {translations.settings.fontSizeSectionDesc}
                </ThemedText>
              </View>
            </View>

            <ThemedCard style={styles.sizeCard}>
              <View style={styles.sizeButtonsRow}>
                {FONT_SIZE_OPTIONS.map((opt) => {
                  const isSelected = fontSizeKey === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      onPress={() => setFontSizeKey(opt.key)}
                      style={[
                        styles.sizeOptionBtn,
                        {
                          backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                          borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                        },
                      ]}
                    >
                      <ThemedText
                        bold={isSelected}
                        style={{
                          color: isSelected ? '#FFFFFF' : theme.colors.text,
                          fontSize: scale(12),
                        }}
                      >
                        {opt.percentage}
                      </ThemedText>
                      <ThemedText
                        variant="caption"
                        style={{
                          color: isSelected ? '#FFFFFF' : theme.colors.textMuted,
                          fontSize: scale(10),
                          marginTop: 2,
                        }}
                      >
                        {opt.key}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Live Size Preview Box */}
              <View
                style={[
                  styles.previewBox,
                  { backgroundColor: theme.colors.background, borderColor: theme.colors.cardBorder },
                ]}
              >
                <ThemedText variant="caption" colorType="muted" style={{ marginBottom: 4 }}>
                  {translations.common.preview}
                </ThemedText>
                <ThemedText variant="title" bold style={{ marginBottom: 4 }}>
                  {translations.home.welcomeTitle}
                </ThemedText>
                <ThemedText variant="body" colorType="secondary">
                  {translations.samples.englishQuote}
                </ThemedText>
                <ThemedText variant="body" colorType="secondary" forceLanguage="km" style={{ marginTop: 4 }}>
                  {translations.samples.khmerQuote}
                </ThemedText>
              </View>
            </ThemedCard>
          </View>
        )}

        {/* ================= 4. KHMER FONTS (10 GOOGLE FONTS) ================= */}
        {(activeTab === 'all' || activeTab === 'fonts') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="text" size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.sectionTitleWrap}>
                <ThemedText variant="subheading" bold>
                  {translations.settings.khmerFontsSectionTitle}
                </ThemedText>
                <ThemedText variant="caption" colorType="muted">
                  {translations.settings.khmerFontsSectionDesc}
                </ThemedText>
              </View>
            </View>

            <View style={styles.fontsList}>
              {KHMER_FONTS.map((font, idx) => {
                const isSelected = khmerFontId === font.id;
                return (
                  <TouchableOpacity
                    key={font.id}
                    activeOpacity={0.8}
                    onPress={() => setKhmerFontId(font.id)}
                    style={[
                      styles.fontItemCard,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                  >
                    <View style={styles.fontItemHeader}>
                      <View style={styles.fontItemBadgeRow}>
                        <View style={[styles.numberBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                          <ThemedText bold style={{ color: theme.colors.primary, fontSize: scale(11) }}>
                            #{idx + 1}
                          </ThemedText>
                        </View>
                        <ThemedText variant="subheading" bold style={{ marginLeft: 8 }}>
                          {font.name}
                        </ThemedText>
                        {font.nativeName ? (
                          <ThemedText
                            variant="subheading"
                            customFont={font.regular}
                            style={{ marginLeft: 8, color: theme.colors.primary }}
                          >
                            ({font.nativeName})
                          </ThemedText>
                        ) : null}
                      </View>

                      {isSelected ? (
                        <View style={[styles.checkCircle, { backgroundColor: theme.colors.primary }]}>
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View style={[styles.radioCircle, { borderColor: theme.colors.border }]} />
                      )}
                    </View>

                    {/* Font Preview Text */}
                    <View
                      style={[
                        styles.fontPreviewArea,
                        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                      ]}
                    >
                      <ThemedText
                        customFont={font.regular}
                        style={{ fontSize: scale(15), color: theme.colors.text }}
                      >
                        {font.sampleText}
                      </ThemedText>
                    </View>

                    <ThemedText variant="caption" colorType="muted" style={{ marginTop: 6 }}>
                      {font.description}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ================= 5. ENGLISH FONTS (10 GOOGLE FONTS) ================= */}
        {(activeTab === 'all' || activeTab === 'fonts') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                <Ionicons name="text-outline" size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.sectionTitleWrap}>
                <ThemedText variant="subheading" bold>
                  {translations.settings.englishFontsSectionTitle}
                </ThemedText>
                <ThemedText variant="caption" colorType="muted">
                  {translations.settings.englishFontsSectionDesc}
                </ThemedText>
              </View>
            </View>

            <View style={styles.fontsList}>
              {ENGLISH_FONTS.map((font, idx) => {
                const isSelected = englishFontId === font.id;
                return (
                  <TouchableOpacity
                    key={font.id}
                    activeOpacity={0.8}
                    onPress={() => setEnglishFontId(font.id)}
                    style={[
                      styles.fontItemCard,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.cardBorder,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                  >
                    <View style={styles.fontItemHeader}>
                      <View style={styles.fontItemBadgeRow}>
                        <View style={[styles.numberBadge, { backgroundColor: theme.colors.badgeBackground }]}>
                          <ThemedText bold style={{ color: theme.colors.primary, fontSize: scale(11) }}>
                            #{idx + 1}
                          </ThemedText>
                        </View>
                        <ThemedText variant="subheading" bold style={{ marginLeft: 8 }}>
                          {font.name}
                        </ThemedText>
                      </View>

                      {isSelected ? (
                        <View style={[styles.checkCircle, { backgroundColor: theme.colors.primary }]}>
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View style={[styles.radioCircle, { borderColor: theme.colors.border }]} />
                      )}
                    </View>

                    {/* Font Preview Text */}
                    <View
                      style={[
                        styles.fontPreviewArea,
                        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                      ]}
                    >
                      <ThemedText
                        customFont={font.regular}
                        style={{ fontSize: scale(14), color: theme.colors.text }}
                      >
                        {font.sampleText}
                      </ThemedText>
                    </View>

                    <ThemedText variant="caption" colorType="muted" style={{ marginTop: 6 }}>
                      {font.description}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ================= RESET BUTTON ================= */}
        <ThemedCard style={styles.resetCard}>
          <ThemedText variant="subheading" bold colorType="danger">
            {translations.settings.resetAllSettings}
          </ThemedText>
          <ThemedText variant="caption" colorType="muted" style={{ marginTop: 4, marginBottom: 14 }}>
            {translations.settings.resetDescription}
          </ThemedText>
          <ThemedButton
            title={translations.common.reset}
            variant="danger"
            onPress={handleReset}
            icon={<Ionicons name="trash-outline" size={18} color="#FFFFFF" />}
          />
        </ThemedCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  resetHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBar: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  filterBarContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitleWrap: {
    flex: 1,
  },
  grid2: {
    flexDirection: 'row',
    gap: 12,
  },
  langCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
  },
  langCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  themeCard: {
    width: '48%',
    borderRadius: 14,
    padding: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  swatchBar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  swatchItem: {
    flex: 1,
  },
  themeCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeCard: {
    padding: 14,
  },
  sizeButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  sizeOptionBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  previewBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  fontsList: {
    gap: 12,
  },
  fontItemCard: {
    borderRadius: 14,
    padding: 14,
  },
  fontItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fontItemBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  fontPreviewArea: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    marginTop: 4,
  },
  resetCard: {
    marginTop: 10,
    borderWidth: 1,
  },
});
