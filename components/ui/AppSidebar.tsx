"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Dumbbell,
  LayoutDashboard,
  MoreVertical,
  Search,
  Settings,
} from "lucide-react";

type SidebarPlan = {
  name: string;
  weekLabel: string;
  progress: number;
};

type SidebarUser = {
  initials: string;
  name: string;
  role: string;
};

type Props = {
  plan: SidebarPlan;
  user: SidebarUser;
};

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isActive: (pathname: string) => boolean;
  showIndicator?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/home",
    icon: LayoutDashboard,
    isActive: (pathname) => pathname === "/home",
  },
  {
    label: "Exercises",
    href: "/home/browse",
    icon: Search,
    isActive: (pathname) => pathname === "/home/browse" || pathname.startsWith("/home/exercise/"),
  },
  {
    label: "Workouts",
    href: "/home/plan",
    icon: Dumbbell,
    isActive: (pathname) => pathname.startsWith("/home/plan") || pathname.startsWith("/home/workout") || pathname.startsWith("/home/complete"),
  },
  {
    label: "Progress",
    href: "/home/progress",
    icon: BarChart3,
    isActive: (pathname) => pathname.startsWith("/home/progress"),
  },
];

const secondaryNavItems: NavItem[] = [
  {
    label: "Settings",
    href: "/home/settings",
    icon: Settings,
    isActive: (pathname) => pathname.startsWith("/home/settings"),
  },
];

const sidebarPaddingY = "calc(var(--space-6) + var(--space-2) / 4)";
const navItemPaddingY = "calc(var(--space-2) + var(--space-1) / 2)";
const logoPaddingBottom = "calc(var(--space-8) + var(--space-2) / 4)";
const tinyGap = "calc(var(--space-1) / 4)";
const mediumRadius = "calc(var(--radius-md) - var(--space-1) / 4)";
const planRadius = "calc(var(--radius-md) + var(--space-1) / 4)";
const logoHorizontalPadding = "calc(var(--space-2) + var(--space-1) / 2)";
const dividerMarginY = "calc(var(--space-3) + var(--space-2) / 4)";
const accentBorder = "1px solid rgba(var(--color-accent-rgb), 0.15)";
const avatarBorder = "calc(var(--space-1) / 2 - var(--space-1) / 8) solid var(--color-accent)";

function navItemClasses(active: boolean) {
  return [
    "group relative flex items-center font-medium overflow-hidden",
    active
      ? "text-[var(--color-accent)]"
      : "text-[var(--color-text-secondary)] hover:bg-[var(--bg-2)] hover:text-[var(--color-text-primary)]",
  ].join(" ");
}

function SidebarNavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const Icon = item.icon;
  const active = item.isActive(pathname);

  return (
    <Link
      href={item.href}
      className={navItemClasses(active)}
      aria-current={active ? "page" : undefined}
      style={{
        gap: "calc(var(--space-3) - var(--space-1) / 4)",
        padding: `${navItemPaddingY} var(--space-3)`,
        borderRadius: mediumRadius,
        fontSize: "13.5px",
        transition: "var(--transition-fast)",
      }}
    >
      {active ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            borderRadius: mediumRadius,
            background: "var(--color-accent-dim)",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      ) : null}
      <Icon className="relative z-[1] shrink-0" style={{ width: "18px", height: "18px" }} />
      <span className="relative z-[1]">{item.label}</span>
      {item.showIndicator ? (
        <span
          aria-hidden="true"
          className="absolute z-[1]"
          style={{
            top: "calc(var(--space-2) - var(--space-1) / 4)",
            right: "calc(var(--space-3) - var(--space-1) / 4)",
            width: "calc(var(--space-2) - var(--space-1) / 8)",
            height: "calc(var(--space-2) - var(--space-1) / 8)",
            borderRadius: "var(--radius-full)",
            background: "var(--color-accent)",
            border: "1.5px solid var(--bg-1)",
          }}
        />
      ) : null}
    </Link>
  );
}

export function AppSidebar({ plan, user }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="flex h-full shrink-0 flex-col overflow-hidden bg-[var(--bg-1)]"
      style={{
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        padding: `${sidebarPaddingY} var(--space-4)`,
        borderRight: "var(--border-subtle)",
      }}
    >
      <div
        className="font-[family-name:var(--font-barlow-condensed)] font-black uppercase tracking-[2px] text-[var(--color-text-primary)]"
        style={{
          padding: `0 ${logoHorizontalPadding} ${logoPaddingBottom}`,
          fontSize: "var(--text-xl)",
        }}
      >
        Rep<span className="text-[var(--color-accent)]">Flow</span>
      </div>

      <nav className="flex flex-col" style={{ gap: tinyGap }}>
        {navItems.map((item) => (
          <SidebarNavLink key={item.label} item={item} pathname={pathname} />
        ))}

        <div
          aria-hidden="true"
          style={{
            height: tinyGap,
            margin: `${dividerMarginY} ${logoHorizontalPadding}`,
            borderTop: "var(--border-subtle)",
          }}
        />

        {secondaryNavItems.map((item) => (
          <SidebarNavLink key={item.label} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col" style={{ gap: "var(--space-3)" }}>
        <div
          style={{
            padding: `var(--space-3) var(--space-3) calc(var(--space-3) - var(--space-1) / 2)`,
            borderRadius: planRadius,
            border: accentBorder,
            background: "var(--color-accent-dim)",
          }}
        >
          <div
            className="font-bold uppercase text-[var(--color-accent)]"
            style={{
              marginBottom: "var(--space-1)",
              fontSize: "var(--text-xs)",
              letterSpacing: "1px",
            }}
          >
            Current Plan
          </div>
          <div
            className="font-semibold text-[var(--color-text-primary)]"
            style={{ marginBottom: "calc(var(--space-2) + var(--space-1) / 2)", fontSize: "13px" }}
          >
            {plan.name}
          </div>
          <div
            aria-hidden="true"
            style={{
              height: "3px",
              borderRadius: "calc(var(--space-1) / 2)",
              background: "var(--bg-3)",
            }}
          >
            <div
              style={{
                width: `${Math.max(0, Math.min(100, plan.progress))}%`,
                height: "3px",
                borderRadius: "calc(var(--space-1) / 2)",
                background: "var(--color-accent)",
              }}
            />
          </div>
          <div
            className="text-[var(--color-text-muted)]"
            style={{ marginTop: "calc(var(--space-2) - var(--space-1) / 2)", fontSize: "11px" }}
          >
            {plan.weekLabel}
          </div>
        </div>

        <Link
          href="/home/settings"
          className="flex items-center hover:border-[rgba(255,255,255,0.10)]"
          style={{
            gap: "calc(var(--space-2) + var(--space-1) / 2)",
            padding: `${navItemPaddingY} ${logoHorizontalPadding}`,
            borderRadius: planRadius,
            border: "var(--border-subtle)",
            transition: "var(--transition-fast)",
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-dim)] font-bold text-[var(--color-accent)]"
            style={{
              width: "calc(var(--space-8))",
              height: "calc(var(--space-8))",
              border: avatarBorder,
              fontSize: "var(--text-sm)",
            }}
          >
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[var(--color-text-primary)]" style={{ fontSize: "13px", fontWeight: 600 }}>
              {user.name}
            </div>
            <div className="truncate text-[var(--color-text-muted)]" style={{ marginTop: "1px", fontSize: "11px" }}>
              {user.role}
            </div>
          </div>
          <MoreVertical className="shrink-0 text-[var(--color-text-muted)]" style={{ width: "16px", height: "16px" }} />
        </Link>
      </div>
    </aside>
  );
}
