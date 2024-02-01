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
        // Check if the expected content is rendered after the search
        expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    });

    await waitFor(() => {
        // Check if the expected content is rendered after the search
        expect(screen.getByTestId('legendary-label')).toBeInTheDocument();
    });

    await waitFor(() => {
        // Check if the expected content is rendered after the search
        expect(screen.getByTestId('description')).toBeInTheDocument();
    });
})