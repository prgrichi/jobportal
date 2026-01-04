export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: 'selector',
  theme: {

    extend: {
      colors: {
        // === Einheitliche Grau-Palette ===
        neutral: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#1F2937",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F8FAFC",
          50: "#F9FAFB",
        },

        // === Primary (Rot) ===
        primary: {
          900: "#7F1D1D",
          700: "#B91C1C",
          600: "#DC2626",
          500: "#EF4444",
          400: "#F87171",
          100: "#FEE2E2",
        },

        // === Accent (Gelb/Orange) ===
        accent: {
          600: "#F59E0B",
          500: "#FBBF24",
        },

        // === Surface ===
        surface: "#ffffff",

        // === Dark Mode Aliases ===
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
      },

      maxWidth: {
        app: "1200px"
      },
    }
  },
  plugins: []
}