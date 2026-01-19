import { memo } from "react";
import { Text } from "src/components/atoms/Text";
import {Heading} from "src/components/atoms/Heading";
import { PersonAvatar } from "src/components/atoms/PersonAvatar";

import { type Contact } from "src/types";

type ContactItemProps = {
    contact: Contact;
    onSelect: (id: string) => void;
    isSelected: boolean;
}


export const ContactItem = memo(({ contact: { firstNameLastName, emailAddress, jobTitle, id }, onSelect, isSelected }: ContactItemProps) => {
    return (
        <li 
        data-testid="contact-item" 
        className={`contact-item ${isSelected ? "contact-item--selected" : ""}`} 
        onClick={() => onSelect(id)} 
        role="button" 
        aria-pressed={isSelected}
        aria-label={`Select ${firstNameLastName}`}
        >
            <div className="contact-item__content">
                <PersonAvatar fullName={firstNameLastName} />
                <div className="contact-item__info">
                    <Heading as="h2" className="contact-item__name">{firstNameLastName}</Heading>
                    <Text as="span" className="contact-item__job-title">{jobTitle}</Text>
                </div>
            </div>
            <a href={`mailto:${emailAddress}`} onClick={(e) => e.stopPropagation()} className="contact-item__email-link">{emailAddress}</a>
        </li>
    );
});

ContactItem.displayName = 'ContactItem';