import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function SearchBar({ placeholder = "Search...", value, onChange, size = "md", className = "" }: SearchBarProps) {
  const sizeClasses = {
    sm: "h-9 text-sm px-9 pl-9",
    md: "h-11 text-base px-10 pl-10",
    lg: "h-14 text-lg px-12 pl-12",
  };
  const iconSizes = { sm: 14, md: 16, lg: 20 };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={iconSizes[size]}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`input-premium ${sizeClasses[size]} pr-10`}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={iconSizes[size]} />
        </button>
      )}
    </div>
  );
}
