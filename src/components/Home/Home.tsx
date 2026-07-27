import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { portfolioLinks } from "@data/links";
import "./home.css";

const profileImage = `${import.meta.env.BASE_URL}profile-400.webp`;
const smallProfileImage = `${import.meta.env.BASE_URL}profile-256.webp`;

const contentVariants: Variants = {
    initial: {
        translateX: "-100vw",
        opacity: 0,
    },

    animate: {
        translateX: "0vw",
        opacity: 1,
        transition: {
            duration: 2,
            when: "beforeChildren",
        },
    },
};

const Home = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section className="home-container" id="home">
            <motion.div
                className="content"
                variants={contentVariants}
                initial={reduceMotion ? false : "initial"}
                animate="animate"
            >
                <h1 className="hero-intro">
                    <span>Hi I'm Ross.</span>
                    {" "}
                    <span className="hero-role">A Senior Software Engineer.</span>
                </h1>
                <div className="home-actions">
                    <a className="home-btn primary" href="#experience">
                        View experience
                    </a>
                    <a
                        href={portfolioLinks.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-btn"
                    >
                        Download CV
                    </a>
                </div>
            </motion.div>

            <motion.div
                className="profile"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                <img
                    src={profileImage}
                    srcSet={`${smallProfileImage} 256w, ${profileImage} 400w`}
                    sizes="(max-width: 480px) 248px, 260px"
                    width="400"
                    height="400"
                    alt="Ross Carter"
                    fetchPriority="high"
                    loading="eager"
                />
            </motion.div>
        </section>
    );
};

export default Home;