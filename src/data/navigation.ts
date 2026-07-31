import type { NavigationItem } from "@/types/portfolio";

export const navigationItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience"},
    { label: "Impact", href: "#impact" },
    { label: "Awards", href: "#awards" },
    { label: "Education", href: "#education" },
    { label: "Connect", href: "#connect" },
] as const satisfies readonly NavigationItem[];