'use client'

import React, { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  subLabel?: string
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  searchPlaceholder?: string
  noResultsText?: string
  className?: string
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder = "Cari...",
  noResultsText = "Tidak ditemukan hasil",
  className,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = options.filter((opt) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return (
      opt.label.toLowerCase().includes(q) ||
      (opt.subLabel && opt.subLabel.toLowerCase().includes(q))
    )
  })

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("")
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={cn("relative w-full z-20", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-left text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all h-12"
      >
        <span className={cn("block truncate font-medium", !selectedOption && "text-slate-500")}>
          {selectedOption 
            ? `${selectedOption.label}${selectedOption.subLabel ? ` - ${selectedOption.subLabel}` : ''}`
            : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl focus:outline-none z-50 max-h-[300px] flex flex-col">
          <div className="relative flex items-center mb-2 px-1 pt-1">
            <Search className="absolute left-3 h-4 w-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto flex-1 max-h-[220px] pr-1 space-y-1 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isSelected 
                        ? "bg-amber-500/10 text-amber-400 font-semibold" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex flex-col truncate">
                      <span className="truncate">{opt.label}</span>
                      {opt.subLabel && (
                        <span className={cn("text-xs mt-0.5", isSelected ? "text-amber-400/70" : "text-slate-500")}>
                          {opt.subLabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-amber-400 shrink-0 ml-2" />}
                  </button>
                )
              })
            ) : (
              <div className="py-6 text-center text-sm text-slate-500">{noResultsText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
