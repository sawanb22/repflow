import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: unknown[]) => DEBUG && console.log("[proxy]", ...args);

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  log("path:", request.nextUrl.pathname);
  log("user:", user?.email ?? "none", userError ? `(error: ${userError.message})` : "");

  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/auth");

  if (!user) {
    if (!isAuthPage) {
      log("→ redirect: no user → /auth/login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return supabaseResponse;
  }

  const { data: prefs, error: prefsError } = await supabase
    .from("user_preferences")
    .select("onboarding_done")
    .eq("user_id", user.id)
    .single();

  if (prefsError && prefsError.code !== "PGRST116") {
    log("prefs error:", prefsError.message, prefsError.code);
  }

  const onboardingDone = prefs?.onboarding_done === true;
  log("onboarding_done:", onboardingDone);

  if (isAuthPage) {
    const target = onboardingDone ? "/home" : "/onboarding";
    log(`→ redirect: auth page → ${target}`);
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (pathname === "/" || pathname === "/onboarding") {
    if (onboardingDone && process.env.NEXT_PUBLIC_BYPASS_ONBOARDING !== "true") {
      log("→ redirect: onboarding done → /home");
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (pathname === "/home" && !onboardingDone && process.env.NEXT_PUBLIC_BYPASS_ONBOARDING !== "true") {
    log("→ redirect: home but not onboarded → /onboarding");
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)",
  ],
};
