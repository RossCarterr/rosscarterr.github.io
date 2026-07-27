import { Heading } from "@components/Heading/Heading";

const About = () => {
    return (
        <section className="section about-section" id="about">
            <Heading text="About" />
            <div className="section-panel">
                <p>
                    I’m a Lead Software Engineer with over 10 years of experience and a passion for Java Spring Boot, backend development,
                    and artificial intelligence. I enjoy building scalable systems, integrating intelligent
                    technologies, and creating solutions that are both reliable and impactful.
                </p>
                <p>
                    My experience spans robust API development, backend architecture, and AI-powered enhancements
                    that help products become smarter, faster, and more useful. I’m confident making technical
                    decisions, evaluating trade-offs, and coordinating with internal and external teams to align
                    delivery with business goals.
                </p>
                <p>
                    Whether I’m improving an existing platform or shaping a new idea from the ground up,
                    I’m motivated by solving meaningful problems through thoughtful engineering. At the
                    heart of my work is a simple goal: to use technology to create better experiences,
                    stronger systems, and solutions that make a real difference.
                </p>
            </div>
        </section>
    );
};

export default About;