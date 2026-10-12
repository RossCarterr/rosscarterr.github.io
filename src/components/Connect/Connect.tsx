import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "@components/Heading/Heading";
import { portfolioLinks } from "@data/links";
import "./connect.css";

const Connect = () => {
    const [copied, setCopied] = useState(false);
    const emailAddress = portfolioLinks.email.replace("mailto:", "");

    const copyEmailToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback for environments where clipboard API is restricted
            setCopied(false);
        }
    };

    return (
        <section className="section connect-section" id="connect">
            <Heading text="Connect" />
            <div className="contact-copy">
                <p>Open to senior, lead engineering roles.</p>
            </div>
            <div className="grid-flow">
                <a
                    href={portfolioLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    title="LinkedIn profile"
                >
                    <FontAwesomeIcon
                        icon={faLinkedin}
                        className="grid-item"
                        aria-hidden="true"
                    />
                    <span>LinkedIn</span>
                </a>
                <a
                    href={portfolioLinks.email}
                    aria-label={`Send email to ${emailAddress}`}
                    title={`Send email to ${emailAddress}`}
                >
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        className="grid-item"
                        aria-hidden="true"
                    />
                    <span>Email Me</span>
                </a>
                <button
                    type="button"
                    className="copy-email-button"
                    onClick={copyEmailToClipboard}
                    aria-label="Copy email address"
                    title="Copy email address"
                >
                    <FontAwesomeIcon
                        icon={copied ? faCheck : faCopy}
                        className="grid-item"
                        aria-hidden="true"
                    />
                    <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
            </div>
        </section>
    );
};

export default Connect;