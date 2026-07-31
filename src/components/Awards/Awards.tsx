import { Heading } from "@components/Heading/Heading";
import { awards } from "@data/awards";

const Awards = () => {
    return (
        <section className="section awards-section" id="awards">
            <Heading text="Awards" />
            <div className="awards-grid">
                {awards.map((award) => (
                    <article className="award-card"
                             key={`${award.issuer}-${award.title}`}>
                        <div>
                            <h3>{award.title}</h3>
                            <p className="role-meta">
                                {award.issuer} | {award.date}
                            </p>
                        </div>
                        {award.description && <p>{award.description}</p>}
                        <p className="section-subtitle">
                        {award.link && (
                            <a href={award.link} target="_blank" rel="noopener noreferrer">
                                View Award
                            </a>
                        )}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Awards;