"use client";
import { useAppStore } from "@/store/appStore";
import { getT } from "@/i18n";

export function useTranslation() {
  const locale = useAppStore((s) => s.locale);
  const t = getT(locale);
  return { t, locale };
}
