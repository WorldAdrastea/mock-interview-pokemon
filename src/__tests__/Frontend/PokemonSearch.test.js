import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainView from "../../Front/Components/MainView";

describe('MainView', () => {
    test ('renders MainView component', () => {
        //Renders main view and checks for certain texts to be on screen
        render(<MainView/>);
    
        expect(screen.getByPlaceholderText('Enter Pokemon Name')).toBeInTheDocument();
    
        expect(screen.getByText('Pokemon Search Engine')).toBeInTheDocument();
        expect(screen.getByText('Recent Searches:')).toBeInTheDocument();
    });
    
    test('handles search and displays results', async () => {
        //Renders main view and creates mock function which returns promise. Promise resolves to an object with json method which returns another promise with properties: name, is_legendary and description
        render(<MainView/>);
    
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ name: 'Pikachu', is_legendary: false, description: 'Electric Pokemon' }),
            })
        );
        
        //User types pikachu into input
        await userEvent.type(screen.getByPlaceholderText('Enter Pokemon Name'), 'pikachu');
    
        //User clicks on search button
        await userEvent.click(screen.getByText('Search'));
    
        //Waits for the component to update
        await waitFor(() => {
            expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
        });
    
        await waitFor(() => {
            expect(screen.getByTestId('legendary-label')).toBeInTheDocument();
        });
    
        await waitFor(() => {
            expect(screen.getByTestId('description')).toBeInTheDocument();
        });
    })
    
    test('handles recent searches', async () => {
        //Renders main view and creates mock function same as above
        render(<MainView/>);
    
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ name: 'Pikachu', is_legendary: false, description: 'Electric Pokemon' }),
            })
        );

        //User types in pikachu into input
        await userEvent.type(screen.getByPlaceholderText('Enter Pokemon Name'), 'pikachu');

        //Waits for conditional loading to disappear after completing fetch
        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        //Tries to find recent search button within wrapper div and to have the text of button be "Pikachu"
        const recentSearchesWrapper = await screen.findByText('Recent Searches:');
        expect(recentSearchesWrapper).toBeInTheDocument();

        const recentSearchButton = screen.getByText(/Pikachu/i);
        expect(recentSearchButton).toBeInTheDocument();
    
        //User clicks the recent search button and waits for it to load
        fireEvent.click(recentSearchButton);

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        //Result should be pikachu
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    })
})

