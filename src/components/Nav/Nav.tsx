import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faMoon,
    faSun,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { navigationItems } from "@data/navigation";
import { Theme } from "@/constants/theme";
import type { ThemeValue } from "@/constants/theme";
import "./nav.css";

interface NavProps {
    readonly theme: ThemeValue;
    readonly onToggleTheme: () => void;
}

const Nav = ({ theme, onToggleTheme }: NavProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const firstNavigationLink = useRef<HTMLAnchorElement>(null);
    const menuButton = useRef<HTMLButtonElement>(null);
    const restoreMenuButtonFocus = useRef(false);

    useEffect(() => {
        if (!menuOpen) {
            if (restoreMenuButtonFocus.current) {
                const focusFrame = window.requestAnimationFrame(() => {
                    menuButton.current?.focus();
                    restoreMenuButtonFocus.current = false;
                });
                return () => window.cancelAnimationFrame(focusFrame);
            }
            return undefined;
        }

        firstNavigationLink.current?.focus();

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                restoreMenuButtonFocus.current = true;
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    const closeMenu = () => {
        if (menuOpen) {
            restoreMenuButtonFocus.current = true;
        }
        setMenuOpen(false);
    };

    return (
        <header className="nav-wrapper">
            <nav id="navbar" className="nav-container" aria-label="Primary navigation">
                <a className="logo" href="#home" onClick={closeMenu}>
                    Ross Carter
                </a>

                <div
                    id="primary-navigation-links"
                    className={`nav-links ${menuOpen ? "active" : ""}`}
                >
                    {navigationItems.map(({ label, href }, index) => (
                        <a
                            key={href}
                            href={href}
                            onClick={closeMenu}
                            ref={index === 0 ? firstNavigationLink : undefined}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <div className="nav-actions">
                    <button
                        className="icon-button"
                        type="button"
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === Theme.DARK ? Theme.LIGHT : Theme.DARK} mode`}
                        title={`Switch to ${theme === Theme.DARK ? Theme.LIGHT : Theme.DARK} mode`}
                    >
                        <FontAwesomeIcon
                            icon={theme === Theme.DARK ? faSun : faMoon}
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        ref={menuButton}
                        className="menu-button"
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="primary-navigation-links"
                        aria-label={`${menuOpen ? "Close" : "Open"} navigation`}
                        title={`${menuOpen ? "Close" : "Open"} navigation`}
                    >
                        <FontAwesomeIcon
                            icon={menuOpen ? faXmark : faBars}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Nav;