import { cn } from "@/lib/utils";

// Islamic-themed decorative star/crescent
export function IslamicStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-4 h-4", className)}>
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 22l-2.09-6.26L4 14l5.91-1.74L12 2z" />
    </svg>
  );
}

export function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-5 h-5", className)}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function QuranIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cn("w-6 h-6", className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={cn("w-6 h-6", className)}>
      <path d="M24 4C17.9 4 13 8.9 13 15c0 3.8 1.8 7.2 4.7 9.4L16 36h16l-1.7-11.6C33.2 22.2 35 18.8 35 15c0-6.1-4.9-11-11-11zm0 2c5 0 9 4 9 9 0 3.1-1.5 5.8-3.9 7.5l-.8.6L30 36H18l1.7-12.9-.8-.6C16.5 20.8 15 18.1 15 15c0-5 4-9 9-9zM10 38v2h28v-2H10z" />
    </svg>
  );
}
