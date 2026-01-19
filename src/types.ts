export type Contact = {
    emailAddress: string;
    firstNameLastName: string;
    id: string;
    jobTitle: string;
};

export type ContactListResponse = {
    contacts: Contact[];
    total: number;
}