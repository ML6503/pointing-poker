/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';

import { fireEvent } from "@testing-library/react";
import { render, screen } from '../../test-utils';


import { InitPage } from '../../components/InitPage/initPage';
// import HomePage from "../pages/index";


describe.skip('init page elements', () => {
    it('renders default state', () => {
        const rooms = []
        // const { getByTestId } = render(InitPage({ rooms }));
        const { getByTestId } = render(<InitPage rooms={ rooms } />);

        const pokerImg = getByTestId("poker-image");
        expect(pokerImg).toBeVisible();

        const startGameBtn = getByTestId("start-new-game-btn");
        const createGameDialog = getByTestId("create-new-game-dialog");
        const roomConnectBtn = getByTestId("room-connect-btn");
        const roomSelectInput = getByTestId("room-select-input");

        expect(startGameBtn).toBeInTheDocument();
        expect(createGameDialog).not.toBeInTheDocument();
        expect(roomConnectBtn).toBeInTheDocument();
        expect(roomSelectInput).toBe('');
    });
});
