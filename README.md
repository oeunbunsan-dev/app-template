# Expo Pro App Template 🚀

A modern, production-ready **Expo SDK 58** and **React Native** mobile application starter template featuring a complete customization system:

- 🇰🇭 **10 Google Khmer Fonts** (Battambang, Bayon, Bokor, Dangrek, Fasthand, Hanuman, Kantumruy Pro, Koulen, Moul, Siemreap)
- 🇬🇧 **10 Google English Fonts** (Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Raleway, Nunito, Oswald, Playfair Display)
- 🎨 **10 Handcrafted Themes** (Clean Light, Obsidian Dark, Midnight Neon, Cyberpunk Synth, Emerald Forest, Sunset Coral, Lavender Mist, Pacific Ocean, Espresso Latte, Royal Crimson)
- 🌐 **Multi-Language i18n** (English as default, Khmer ភាសាខ្មែរ, and Chinese 中文)
- 🔠 **Typography Sizing & Scaling** (Small 85%, Normal 100%, Medium 115%, Large 130%, Extra Large 145%)
- 💾 **Persistent Settings** using `@react-native-async-storage/async-storage`
- 🧪 **Interactive Live Typography Sandbox** to test real-time font rendering in all scripts
- 🧩 **Themed Component Library** (`ThemedText`, `ThemedView`, `ThemedCard`, `ThemedButton`, `Header`)

---

## 📱 Features Overview

### 1. 🔤 10 Khmer Google Fonts
Engineered for Khmer script typography with automated font matching:

| # | Font Name | Khmer Script Preview | Description |
|---|-----------|----------------------|-------------|
| 1 | **Battambang** *(Default)* | បាត់ដំបង | Clean modern Khmer sans-serif, perfect for reading & interfaces |
| 2 | **Bayon** | បាយ័ន | Distinctive decorative display inspired by ancient temple motifs |
| 3 | **Bokor** | បូកគោ | Classic retro decorative Khmer script with curve aesthetics |
| 4 | **Dangrek** | ដងរែក | Bold expressive display font with geometric strength |
| 5 | **Fasthand** | ហ្វាសហែន | Fluid handwriting Khmer script with calligraphic strokes |
| 6 | **Hanuman** | ហនុមាន | Traditional Khmer serif typeface, highly legible for long texts |
| 7 | **Kantumruy Pro** | កណ្ដុំរុយ ប្រូ | Premium modern workhorse font optimized for high-density UI |
| 8 | **Koulen** | គូលែន | Impactful headline font with heavy weight and bold presence |
| 9 | **Moul** | មូល | Authentic Khmer curved formal Moul script for titles & heritage |
| 10 | **Siemreap** | សៀមរាប | Balanced compact Khmer text font for screens & UI components |

---

### 2. 🔤 10 English Google Fonts
Selected for versatility, legibility, and modern mobile app design:

| # | Font Name | Style | Best For |
|---|-----------|-------|----------|
| 1 | **Inter** *(Default)* | Neo-Grotesque Sans | Clean UI and high-density mobile interfaces |
| 2 | **Roboto** | Geometric Sans | Natural reading rhythm and body text |
| 3 | **Poppins** | Geometric Rounded Sans | Friendly, contemporary app UI |
| 4 | **Montserrat** | Wide-set Sans | Architectural elegance and punchy headings |
| 5 | **Open Sans** | Humanist Sans | High legibility across all screen densities |
| 6 | **Lato** | Warm Humanist Sans | Balanced, serious yet inviting design |
| 7 | **Raleway** | Elegant Sans | Refined headers and sophisticated details |
| 8 | **Nunito** | Rounded Sans | Cozy, approachable, playful modern apps |
| 9 | **Oswald** | Condensed Gothic Sans | Impactful hero metrics, badges, and headers |
| 10 | **Playfair Display** | Luxury Transitional Serif | Editorial aesthetics and luxury branding |

---

### 3. 🎨 10 Handcrafted Themes
Switch dynamically with instant feedback across all screens:

1. **Clean Light** (Light): Slate `#2563EB` & crisp white surface.
2. **Obsidian Dark** (Dark): OLED deep `#0B0F17` & graphite accents.
3. **Midnight Neon** (Dark): Deep space navy `#030712` & electric cyan glow.
4. **Cyberpunk Synth** (Dark): Synthwave neon purple `#D946EF`, pink & amber.
5. **Emerald Forest** (Light): Eco-luxury rainforest `#059669` & mint jade.
6. **Sunset Coral** (Light): Warm dusk coral `#EA580C`, tangerine & amber.
7. **Lavender Mist** (Light): Nordic pastel lilac `#7C3AED` & soft violet.
8. **Pacific Ocean** (Dark): Oceanic deep teal `#0284C7` & aquamarine.
9. **Espresso Latte** (Light): Warm café latte `#78350F` & caramel tones.
10. **Royal Crimson** (Dark): Regal ruby `#E11D48` & velvet rose gold.

---

### 4. 🌐 Internationalization (i18n)
- **English** (`en`) — Default
- **Khmer** (`km` — ភាសាខ្មែរ)
- **Chinese** (`zh` — 中文)

Translations are strictly typed through `TranslationSchema` in [src/languages/types.ts](src/languages/types.ts).

---

### 5. 🔠 Typography Sizing
Users can adjust the global typography scale:
- **Small (85%)** — Compact density
- **Normal (100%)** — Default standard
- **Medium (115%)** — Enhanced legibility
- **Large (130%)** — High readability
- **Extra Large (145%)** — Accessibility focused

---

## 📁 Project Structure

```text
├── assets/                  # App icon, splash screen & local images
├── src/
│   ├── app/                 # Expo Router file-based screens
│   │   ├── _layout.tsx      # Font loader, splash screen & theme provider
│   │   ├── index.tsx        # Dashboard, overview & typography sandbox
│   │   └── settings/
│   │       └── index.tsx    # Settings screen (Language, Theme, Fonts, Size)
│   ├── components/          # Reusable Themed UI Components
│   │   ├── Header.tsx       # Standardized navigation header
│   │   ├── ThemedButton.tsx # Themed touchable button with variants
│   │   ├── ThemedCard.tsx   # Elevation and surface container
│   │   ├── ThemedText.tsx   # Automatic font-matching, scaling & colors
│   │   └── ThemedView.tsx   # Theme background and surface view
│   ├── constants/           # Design tokens and font registries
│   │   ├── fontSize.ts      # Typography scales & sizing helpers
│   │   ├── fonts.ts         # 10 Khmer + 10 English fonts configuration
│   │   └── themes.ts        # 10 complete color theme palettes
│   ├── context/
│   │   └── AppSettingsContext.tsx # Context & AsyncStorage persistence
│   └── languages/           # i18n translation dictionaries
│       ├── types.ts         # Translation schema interface
│       ├── english.ts       # English translations (default)
│       ├── khmer.ts         # Khmer translations
│       ├── chinese.ts       # Chinese translations
│       └── index.ts         # Registry & helper utilities
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # Path alias configuration (@/*)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **npm** or **bun**
- **Expo Go** or an iOS Simulator / Android Emulator

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/oeunbunsan-dev/app-template.git
cd app-template
npm install
```

### 3. Start Development Server

```bash
npx expo start
```

Press:
- `i` to open iOS Simulator
- `a` to open Android Emulator
- `w` to open in Web browser

---

## 🛠 Available Scripts

```bash
npm run start       # Start the Expo development server
npm run ios         # Start on iOS Simulator
npm run android     # Start on Android Emulator
npm run web         # Start on Web browser
npx tsc --noEmit    # Run TypeScript typecheck
npx expo-doctor     # Diagnose dependencies and configuration health
```

---

## 💡 How to Use the Theme & Settings System

### 1. Using `ThemedText`
`ThemedText` automatically uses the selected theme's text color, the active font family, and scales text according to the user's font size settings:

```tsx
import { ThemedText } from '@/components/ThemedText';

// Automatic scaling & active font
<ThemedText variant="title" bold>
  Hello World
</ThemedText>

// Force Khmer font
<ThemedText forceLanguage="km">
  សួស្តីពិភពលោក
</ThemedText>
```

### 2. Using the `useAppSettings` Hook
Access any setting anywhere in your components:

```tsx
import { useAppSettings } from '@/context/AppSettingsContext';

export function MyComponent() {
  const {
    theme,           // Current theme object & color palette
    language,        // 'en' | 'km' | 'zh'
    translations,    // Strongly typed translation dictionary
    setThemeId,      // Switch theme
    setLanguage,     // Switch language
    scale,           // Scale a numeric value: scale(16)
  } = useAppSettings();

  return (
    <View style={{ backgroundColor: theme.colors.card }}>
      <Text style={{ color: theme.colors.primary }}>
        {translations.common.settings}
      </Text>
    </View>
  );
}
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
