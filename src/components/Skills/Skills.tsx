import { useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faCode,
    faDatabase,
    faPeopleGroup,
    faServer,
} from "@fortawesome/free-solid-svg-icons";
import { faAws } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { skills } from "@data/skills";
import { Heading } from "@components/Heading/Heading";
import type { SkillIconName } from "@/types/portfolio";
import "./skills.css";

const icons: Record<SkillIconName, IconDefinition> = {
    cloud: faAws,
    code: faCode,
    database: faDatabase,
    people: faPeopleGroup,
    server: faServer,
};

// Skill group contextual experience & impact examples (derived accurately from experience & impact data)
const skillCategoryContexts: Record<
    string,
    Array<{ readonly source: string; readonly text: string }>
> = {
    "Backend Engineering": [
        {
            source: "Technical Lead (Diageo)",
            text: "Lead Java, Spring Boot, and AWS delivery across high-scale consumer platforms.",
        },
        {
            source: "Connected Devices Impact",
            text: "Delivered Java, Spring Boot, Lambda, Glue and DynamoDB backend services supporting connected platforms.",
        },
    ],
    "Cloud & DevOps": [
        {
            source: "Technical Lead (Diageo)",
            text: "Architected greenfield internal cloud services and modernised delivery infrastructure.",
        },
        {
            source: "Engineering Standards Impact",
            text: "Built CI/CD pipelines from scratch, added SonarQube quality gates, and automated test coverage.",
        },
    ],
    "Data, Search & AI": [
        {
            source: "Applied AI Impact",
            text: "Led the integration of LLMs and AI agents into a global marketing service, transforming insights into smarter recommendations.",
        },
        {
            source: "Personalisation Platform Impact",
            text: "Scaled taste profiles from 400,000 to more than 70 million, backed by Java services and machine learning endpoints.",
        },
    ],
    "Frontend & Testing": [
        {
            source: "Senior Software Engineer (Diageo)",
            text: "Modernised services and delivery practices, introducing automated unit, integration, and acceptance testing.",
        },
        {
            source: "Infotainment Microservices (Jaguar Land Rover)",
            text: "Developed web microservices for in-vehicle infotainment systems with robust test suites.",
        },
    ],
    "Leadership": [
        {
            source: "Technical Lead (Diageo)",
            text: "Coordinate internal teams and external partners to align technical delivery with strategic business priorities.",
        },
        {
            source: "Engineering Management (Jaguar Land Rover)",
            text: "Line managed software engineers, supporting career growth, delivery performance, and day-to-day best practices.",
        },
    ],
};

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
    const carouselRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const total = skills.length;
    const currentSkill = skills[activeIndex] ?? skills[0];
    const currentContext = skillCategoryContexts[currentSkill?.title ?? ""] ?? [];

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [total]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, [total]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
        } else if (e.key === "Home") {
            e.preventDefault();
            setActiveIndex(0);
        } else if (e.key === "End") {
            e.preventDefault();
            setActiveIndex(total - 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.targetTouches[0]) {
            touchStartX.current = e.targetTouches[0].clientX;
        }
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.targetTouches[0]) {
            touchEndX.current = e.targetTouches[0].clientX;
        }
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
            handleNext();
        } else if (diff < -50) {
            handlePrev();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!currentSkill) return null;

    return (
        <section className="section skills-container" id="skills">
            <Heading text="Skills" />
            <p className="section-subtitle">
                Explore core technical domains, tools, and real-world project applications.
            </p>

            <div className="skills-wrapper">
                {/* Category Quick Selector Tabs */}
                <div
                    className="skills-tablist"
                    role="tablist"
                    aria-label="Skill Categories"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {skills.map((skill, index) => {
                        const isSelected = activeIndex === index && viewMode === "carousel";
                        return (
                            <button
                                key={skill.title}
                                role="tab"
                                id={`skill-tab-${index}`}
                                aria-selected={isSelected}
                                aria-controls={`skill-panel-${index}`}
                                className={`skills-tab-button ${isSelected ? "active" : ""}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (viewMode !== "carousel") setViewMode("carousel");
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={icons[skill.icon]}
                                    aria-hidden="true"
                                />
                                <span>{skill.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Carousel */}
                <div
                    ref={carouselRef}
                    className="skills-carousel-container"
                    aria-label="Skills & Experience Carousel"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="skills-carousel-header">
                        <div className="skills-carousel-title">
                            <FontAwesomeIcon
                                icon={icons[currentSkill.icon]}
                                className="skill-icon"
                                aria-hidden="true"
                            />
                            <h3>{currentSkill.title}</h3>
                        </div>

                        <div className="skills-carousel-controls">
                            <button
                                type="button"
                                className="carousel-btn"
                                onClick={handlePrev}
                                aria-label="Previous skill category"
                                title="Previous skill category (Left Arrow)"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="carousel-btn"
                                onClick={handleNext}
                                aria-label="Next skill category"
                                title="Next skill category (Right Arrow)"
                            >
                                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div
                        id={`skill-panel-${activeIndex}`}
                        role="tabpanel"
                        aria-labelledby={`skill-tab-${activeIndex}`}
                        className="carousel-slide-content"
                        aria-live="polite"
                    >
                        <div className="skills-tags-section">
                            <h4>Core Technologies & Proficiencies</h4>
                            <ul className="skills-carousel-tags">
                                {currentSkill.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>

                        {currentContext.length > 0 && (
                            <div className="skills-context-section">
                                <h4>Relevant Experience & Impact Highlights</h4>
                                <div className="skills-context-grid">
                                    {currentContext.map((item) => (
                                        <div key={item.source} className="skill-context-card">
                                            <div className="context-source">{item.source}</div>
                                            <p>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dot indicators */}
                    <div className="skills-carousel-indicators" aria-hidden="true">
                        {skills.map((skill, index) => (
                            <button
                                key={skill.title}
                                type="button"
                                tabIndex={-1}
                                className={`indicator-dot ${activeIndex === index ? "active" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
