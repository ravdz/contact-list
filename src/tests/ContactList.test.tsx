import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactList } from 'src/components/organisms/ContactList';
import apiData from 'src/api';

jest.mock('src/api', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const createMockContacts = (batchNumber: number) => 
    Array.from({ length: 10 }, (_, i) => {
        const id = batchNumber * 10 + i;
        return {
            id: id.toString(),
            firstNameLastName: `Person ${id}`,
            emailAddress: `person${id}@example.com`,
            jobTitle: `Job ${id}`,
        };
    });

describe('Contact list', () => {
    let callCount: number;

    beforeEach(() => {
        jest.clearAllMocks();
        callCount = 0;
        window.scrollTo = jest.fn();
        (apiData as jest.Mock).mockImplementation(() => {
            const contacts = createMockContacts(callCount);
            callCount++;
            return Promise.resolve({
                contacts,
                total: 100,
            });
        });
    });
    it('contacts are paginated (10 items in batch)', async () => {
        render(<ContactList/>);

        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(10);
        });
    });
    it('"Load more" button exists and fetches next batch', async () => {
        const user = userEvent.setup();
        render(<ContactList/>);

        await waitFor(() => {
            expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
        });

        const loadMoreButton = screen.getByTestId('load-more-button');
        await user.click(loadMoreButton);
        
        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(20);
        });
    });
    it('displays loading state when fetching data', async () => {
        render(<ContactList/>);

        await waitFor(() => {
            expect(screen.getByTestId('loading-state')).toBeInTheDocument();
        });
    });
    it('displays error state when fetching data fails', async () => {
        (apiData as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
        render(<ContactList/>);

        await waitFor(() => {
            expect(screen.getByTestId('error-state')).toBeInTheDocument();
        });
    });
    it('each contact information card is selectable', async () => {
        const user = userEvent.setup();
        render(<ContactList/>);
        
        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(10);
        });
        
        const firstContactItem = screen.getAllByTestId('contact-item')[0];
        const selectedContactsCounter = screen.getByTestId('selected-contacts-counter');
        expect(selectedContactsCounter).toHaveTextContent('0');
        await user.click(firstContactItem);
        expect(selectedContactsCounter).toHaveTextContent('1');
    });
    it('selected contact information cards have outline', async () => {
        const user = userEvent.setup();
        render(<ContactList/>);

        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(10);
        });
        
        const firstContactItem = screen.getAllByTestId('contact-item')[0];
        await user.click(firstContactItem);
        expect(firstContactItem).toHaveClass('contact-item--selected');
    });
    it('selected card can be deselected', async () => {
        const user = userEvent.setup();
        render(<ContactList/>);
        
        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(10);
        });
        
        const firstContactItem = screen.getAllByTestId('contact-item')[0];
        const selectedContactsCounter = screen.getByTestId('selected-contacts-counter');
        expect(selectedContactsCounter).toHaveTextContent('0');
        await user.click(firstContactItem);
        expect(selectedContactsCounter).toHaveTextContent('1');
        await user.click(firstContactItem);
        expect(selectedContactsCounter).toHaveTextContent('0');
    });
    it('selected contacts are displayed at the top of the list', async () => {
        const user = userEvent.setup();
        render(<ContactList/>);
        
        await waitFor(() => {
            expect(screen.getAllByTestId('contact-item')).toHaveLength(10);
        });
        
        const contactItems = screen.getAllByTestId('contact-item');
        const fifthContact = contactItems[4];
        const fifthContactName = fifthContact.querySelector('.contact-item__name')?.textContent;

        await user.click(fifthContact);
        
        const updatedContactItems = screen.getAllByTestId('contact-item');
        const firstContactName = updatedContactItems[0].querySelector('.contact-item__name')?.textContent;
        expect(firstContactName).toBe(fifthContactName);
    });
});
