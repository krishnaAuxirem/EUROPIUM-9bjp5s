import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // EUROPIUM Brand Colors
        navy: {
          50: "#E8EEF5",
          100: "#C5D3E8",
          200: "#9DB5D6",
          300: "#7597C4",
          400: "#5580B7",
          500: "#3469AB",
          600: "#2A5A9A",
          700: "#1E4A84",
          800: "#173A6E",
          900: "#12355B",
          950: "#0A1F38",
          1000: "#06141E",
        },
        royalblue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        gold: {
          50: "#FEF9EC",
          100: "#FDF0C9",
          200: "#FAE08F",
          300: "#F7CC55",
          400: "#F4B92B",
          500: "#D4A72C",
          600: "#B88A1A",
          700: "#9A6E13",
          800: "#7D5610",
          900: "#664510",
        },
        emerald: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        // Semantic
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "premium": "0 4px 24px rgba(18, 53, 91, 0.12), 0 1px 4px rgba(18, 53, 91, 0.08)",
        "premium-lg": "0 8px 40px rgba(18, 53, 91, 0.18), 0 2px 8px rgba(18, 53, 91, 0.10)",
        "premium-xl": "0 16px 64px rgba(18, 53, 91, 0.22), 0 4px 16px rgba(18, 53, 91, 0.12)",
        "gold": "0 4px 24px rgba(212, 167, 44, 0.25)",
        "card": "0 2px 12px rgba(18, 53, 91, 0.08), 0 1px 3px rgba(18, 53, 91, 0.05)",
        "card-hover": "0 8px 32px rgba(18, 53, 91, 0.16), 0 2px 8px rgba(18, 53, 91, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "counter": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "shimmer": "shimmer 1.5s infinite linear",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #12355B 0%, #1E4A84 50%, #2563EB 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4A72C 0%, #F4B92B 100%)",
        "gradient-hero": "linear-gradient(160deg, #12355B 0%, #1a3f6f 40%, #2563EB 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
