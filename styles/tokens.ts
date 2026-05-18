// RepFlow Design Tokens
// Source: /docs/RepFlow_UIUX_Design_Document_v1.0.md Section 6 — Design System
// Rule: never hardcode hex values — always use tokens.

export const tokens = {
  // ── Colors — 3-tier architecture: Brand, Surface, Semantic ──
  color: {
    // Brand
    accent: "#C9A87A",
    accentDim: "rgba(201,168,122,0.09)",
    accentGlow: "rgba(201,168,122,0.12)",
    accentBorder: "rgba(201,168,122,0.20)",

    // Surface layers — depth through color value, not shadows
    bg: {
      page: "#0A0A0A",
      sidebar: "#0F0F0F",
      card: "#141414",
      inner: "#1C1C1C",
      raised: "#252525",
    },

    // Text — warm cream, never pure white
    text: {
      primary: "#F0EBE3",
      secondary: "#888480",
      muted: "#484542",
      link: "#C9A87A",
    },

    // Semantic
    success: "#4DC87B",
    danger: "#E06560",
    info: "#4895EF",

    // Borders — subtle transparent
    border: {
      subtle: "1px solid rgba(255,255,255,0.055)",
      default: "1px solid rgba(255,255,255,0.10)",
      accent: "1px solid rgba(201,168,122,0.20)",
    },

    // Badges per difficulty
    badge: {
      beginner: {
        bg: "rgba(77,200,123,0.10)",
        text: "#4DC87B",
        border: "1px solid rgba(77,200,123,0.15)",
      },
      intermediate: {
        bg: "rgba(201,168,122,0.10)",
        text: "#C9A87A",
        border: "1px solid rgba(201,168,122,0.20)",
      },
      advanced: {
        bg: "rgba(224,101,96,0.10)",
        text: "#E06560",
        border: "1px solid rgba(224,101,96,0.15)",
      },
    },

    // Tailwind class strings for common patterns
    class: {
      bg_page: "bg-[#0A0A0A]",
      bg_card: "bg-[#141414]",
      text_primary: "text-[#F0EBE3]",
      text_secondary: "text-[#888480]",
      text_muted: "text-[#484542]",
      accent_text: "text-[#C9A87A]",
      border_subtle: "border-[rgba(255,255,255,0.055)]",
      border_default: "border-[rgba(255,255,255,0.10)]",
      border_accent: "border-[rgba(201,168,122,0.20)]",
    },
  },

  // ── Border Radius ──
  radius: {
    sm: "rounded-[6px]",
    md: "rounded-[9px]",
    lg: "rounded-[12px]",
    xl: "rounded-[16px]",
    "2xl": "rounded-[24px]",
    full: "rounded-full",
  },

  // ── Spacing — base-8 system ──
  space: {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    p_card: "p-4",
    p_cardHero: "px-6 py-5",
    p_button_md: "px-[22px] py-[11px]",
  },

  // ── Layout ──
  layout: {
    sidebarWidth: "var(--sidebar-width)",
    sidebarCollapsedWidth: "var(--sidebar-width-collapsed)",
    transitionFast: "var(--transition-fast)",
    transitionNormal: "var(--transition-normal)",
    transitionSlow: "var(--transition-slow)",
  },

  // ── Content Width ──
  maxWidth: {
    auth: "max-w-sm",
    onboarding: "max-w-md",
    page: "max-w-5xl",
  },

  // ── Typography ──
  font: {
    display: "font-[family-name:var(--font-barlow-condensed)]",
    body: "font-[family-name:var(--font-figtree)]",
  },
  text: {
    heading: "font-[family-name:var(--font-barlow-condensed)] text-[30px] font-black leading-tight tracking-[-0.3px] text-[#F0EBE3]",
    subheading: "font-[family-name:var(--font-barlow-condensed)] text-xl font-bold text-[#F0EBE3]",
    body: "text-sm text-[#888480]",
    bodyLg: "text-base text-[#888480]",
    label: "text-[10px] font-semibold uppercase tracking-[1px] text-[#888480]",
    eyebrow: "text-[10px] font-bold uppercase tracking-[1.5px] text-[#C9A87A]",
    smallDesc: "text-xs text-[#484542]",
  },

  // ── Button ──
  button: {
    base: "font-[family-name:var(--font-barlow-condensed)] text-base font-extrabold uppercase tracking-[0.8px] transition-all duration-200",
    primary: "bg-[#C9A87A] text-[#0A0A0A] hover:opacity-90 active:opacity-80 active:scale-[0.98] disabled:opacity-35",
    secondary: "border border-[rgba(255,255,255,0.10)] bg-transparent text-[#888480] hover:bg-[#141414] hover:border-[rgba(255,255,255,0.18)] hover:text-[#F0EBE3]",
    ghost: "text-[#888480] hover:text-[#F0EBE3]",
    padding: {
      sm: "px-3 py-2",
      md: "px-[22px] py-[11px]",
      lg: "px-8 py-3.5",
      icon: "p-2",
    },
    full: "w-full",
  },

  // ── Card ──
  card: {
    base: "bg-[#141414] border border-[rgba(255,255,255,0.055)]",
    hover: "hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5 transition-all duration-200",
    hero: "bg-[#141414] border border-[rgba(255,255,255,0.055)] relative overflow-hidden",
  },

  // ── Input ──
  input: {
    base: "block w-full bg-[#141414] border border-[rgba(255,255,255,0.055)] text-[#F0EBE3] placeholder:text-[#484542] transition-colors duration-200",
    focus: "focus:border-[rgba(201,168,122,0.30)] focus:outline-none",
  },

  // ── Logo ──
  logo: {
    container: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A87A]",
    containerLg: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A87A]",
    icon: "h-6 w-6 text-[#0A0A0A]",
    iconLg: "h-8 w-8 text-[#0A0A0A]",
  },

  // ── Filter Chip ──
  filterChip: {
    base: "px-[15px] py-[7px] text-[13px] font-medium rounded-[7px] border transition-all duration-150",
    default: "bg-[#141414] border-[rgba(255,255,255,0.055)] text-[#888480] hover:border-[rgba(255,255,255,0.10)]",
    active: "bg-[rgba(201,168,122,0.09)] border-[rgba(201,168,122,0.30)] text-[#C9A87A]",
  },

  // ── Progress Bar ──
  progress: {
    track: "bg-[#141414]",
    fill: "bg-[#C9A87A]",
    dot: "bg-[#C9A87A]",
  },

  // ── Search Bar ──
  search: {
    base: "h-11 bg-[#141414] border border-[rgba(255,255,255,0.055)] px-[14px] text-sm text-[#F0EBE3] placeholder:text-[#484542] transition-colors duration-200",
    focus: "focus:border-[rgba(201,168,122,0.30)] focus:outline-none",
  },
} as const;
