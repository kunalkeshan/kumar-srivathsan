"use client"

export function CopyrightYear() {
  const current = new Date().getFullYear()
  const start = 2026

  return <>{current > start ? `${start}-${current}` : `${start}`}</>
}
