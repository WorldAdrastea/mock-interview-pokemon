import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainView from "../../Front/Components/MainView";

test ('renders MainView component', () => {
    render(<MainView/>);

    expect(screen.getByPlaceholderText('Enter Pokemon Name')).toBeInTheDocument();

    expect(screen.getByText('Pokemon Search Engine')).toBeInTheDocument();
    expect(screen.getByText('Recent Searches:')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
    render(<MainView/>);

    // Type 'charizard' into the input
    await userEvent.type(screen.getByPlaceholderText('Enter Pokemon Name'), 'charizard');

    // Click on the button with the text 'Search'
    await userEvent.click(screen.getByText('Search'));

    // Wait for the component to update and assertions to complete
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
    render(<MainView/>);

    await userEvent.type(screen.getAllByPlaceholderText('Enter Pokemon Name'), 'charizard');

    await userEvent.click(screen.getByText('Search'));

    await waitFor(() => {
        expect(screen.getAllByTestId('pokemon-name')).toBeInTheDocument();
    });

    const lastSearchedPokemon = screen.getAllByRole('button', { name: /Invalid Search/i }).pop().textContent;
    
    await userEvent.click(screen.getAllByText(lastSearchedPokemon));

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