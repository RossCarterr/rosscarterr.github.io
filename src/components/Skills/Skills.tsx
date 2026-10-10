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
    "Backend & Systems": [
        {
            source: "Lead Software Engineer (Diageo)",
            text: "Architect Java 25 & Spring Boot 4 microservices on Amazon ECS with sub-200ms response times.",
        },
        {
            source: "Connected Platforms Impact",
            text: "Delivered Java, Spring Boot, Lambda, Glue, and DynamoDB backend services supporting connected dispensing systems.",
        },
    ],
    "Cloud & DevOps": [
        {
            source: "Lead Software Engineer (Diageo)",
            text: "Architected greenfield cloud-native services with AWS CodePipeline, ECS, and GitLab CI.",
        },
        {
            source: "Engineering Governance Impact",
            text: "Raised automated test coverage from 0% to over 80% with SonarQube quality gates.",
        },
    ],
    "AI, Machine Learning & Data": [
        {
            source: "Applied AI & Recognition Impact",
            text: "Engineered award-winning AI marketing products with AWS SageMaker and sub-200ms response times.",
        },
        {
            source: "Personalisation Platform Impact",
            text: "Scaled FlavorPrint platform from 400,000 to over 70 million consumer flavour profiles with MongoDB and SageMaker.",
        },
    ],
    "Frontend & Quality Engineering": [
        {
            source: "Lead Software Engineer (Diageo)",
            text: "Modernised frontend and full-stack services with TypeScript, React, and Playwright end-to-end testing.",
        },
        {
            source: "Infotainment Microservices (Jaguar Land Rover)",
            text: "Developed web microservices for in-vehicle infotainment systems with robust automated test suites.",
        },
    ],
    "Engineering Leadership": [
        {
            source: "Lead Software Engineer (Diageo)",
            text: "Champion engineering governance frameworks including Architecture Decision Records (ADRs) and PR reviews.",
        },
        {
            source: "Senior Software Engineer (Jaguar Land Rover)",
            text: "Line managed and mentored four software engineers, driving performance, career growth, and delivery excellence.",
        },
    ],
};

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);
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
        const firstTouch = e.targetTouches[0];
        if (firstTouch) {
            touchStartX.current = firstTouch.clientX;
        }
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const firstTouch = e.targetTouches[0];
        if (firstTouch) {
            touchEndX.current = firstTouch.clientX;
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
                        const isSelected = activeIndex === index;
                        return (
                            <button
                                key={skill.title}
                                role="tab"
                                id={`skill-tab-${index}`}
                                aria-selected={isSelected}
                                aria-controls={`skill-panel-${index}`}
                                className={`skills-tab-button ${isSelected ? "active" : ""}`}
                                onClick={() => setActiveIndex(index)}
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
