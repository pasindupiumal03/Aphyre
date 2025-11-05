import React from "react";
import { cn } from "@/lib/utils";

interface SourceIconProps {
  source: string | { name: string; logo?: string; domain?: string };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getSourceInfo = (source: string | { name: string; logo?: string; domain?: string }) => {
  // Domain mapping for better logo fetching
  const domainMap: Record<string, { name: string; domain: string }> = {
    "cointelegraph": { name: "Cointelegraph", domain: "cointelegraph.com" },
    "coindesk": { name: "CoinDesk", domain: "coindesk.com" },
    "theblock": { name: "The Block", domain: "theblock.co" },
    "decrypt": { name: "Decrypt", domain: "decrypt.co" },
    "bitcoinmagazine": { name: "Bitcoin Magazine", domain: "bitcoinmagazine.com" },
    "cnbc": { name: "CNBC", domain: "cnbc.com" },
    "wsj": { name: "Wall Street Journal", domain: "wsj.com" },
    "bloomberg": { name: "Bloomberg", domain: "bloomberg.com" },
    "yahoo": { name: "Yahoo Finance", domain: "finance.yahoo.com" },
    "marketwatch": { name: "MarketWatch", domain: "marketwatch.com" },
    "reuters": { name: "Reuters", domain: "reuters.com" },
    "ft": { name: "Financial Times", domain: "ft.com" },
    "techcrunch": { name: "TechCrunch", domain: "techcrunch.com" },
    "venturebeat": { name: "VentureBeat", domain: "venturebeat.com" },
    "forbes": { name: "Forbes", domain: "forbes.com" },
  };

  if (typeof source === "string") {
    const sourceLower = source.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
    const mapped = domainMap[sourceLower];
    const domain = mapped?.domain || `${sourceLower}.com`;
    const name = mapped?.name || source;
    const logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    
    return { name, logo, domain };
  } else {
    const sourceLower = source.name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
    const mapped = domainMap[sourceLower];
    const domain = source.domain || mapped?.domain || `${sourceLower}.com`;
    const name = source.name;
    const logo = source.logo || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    
    return { name, logo, domain };
  }
};

export function SourceIcon({ source, size = "md", className }: SourceIconProps) {
  const { name, logo } = getSourceInfo(source);
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex items-center justify-center rounded-lg overflow-hidden bg-secondary/30 border border-accent/20", sizeClasses[size], className)}>
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to a default icon if logo fails to load
          const target = e.target as HTMLImageElement;
          target.src = `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D8698E"><rect width="24" height="24" rx="4" fill="#D8698E"/><text x="12" y="16" text-anchor="middle" fill="white" font-family="sans-serif" font-size="10" font-weight="bold">${name.charAt(0).toUpperCase()}</text></svg>`
          )}`;
        }}
      />
    </div>
  );
}

export default SourceIcon;