import "./heading.css";

interface HeadingProps {
    readonly text: string;
}

export const Heading = ({ text }: HeadingProps) => {
    return (
        <div className="heading-container">
            <h2 className="heading">{text}</h2>
            <span aria-hidden="true" />
        </div>
    );
};