import { Heading } from "@components/Heading/Heading";
import { impactStories } from "@data/impactStories";

const Impact = () => {
    return (
        <section className="section impact-section" id="impact">
            <Heading text="Impact" />
            <div className="impact-grid">
                {impactStories.map((story) => (
                    <article className="impact-card" key={story.title}>
                        <p className="eyebrow">{story.kicker}</p>
                        <h3>{story.title}</h3>
                        <p>{story.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Impact;