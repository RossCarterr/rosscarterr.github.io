import { Heading } from "@components/Heading/Heading";

const About = () => {
    return (
        <section className="section about-section" id="about">
            <Heading text="About" />
            <div className="section-panel">
                <p>
                    Lead Software Engineer with more than 10 years of experience
                    delivering production software. My work combines hands-on Java and
                    Spring Boot development with AWS architecture, infrastructure as
                    code, CI/CD and operational ownership.
                </p>
                <p>
                    I lead technical delivery, make architecture decisions and coordinate
                    internal teams and external suppliers. I take responsibility for
                    systems throughout their lifecycle, from early requirements and
                    design through deployment, monitoring and production support.
                </p>
            </div>
        </section>
    );
};

export default About;