/**
 * @jest-environment jsdom
 */
import * as React from "react";
export * from '@testing-library/react';
import { render } from '../../__mocks__/test-utils';

import GameResultsPopup from '../../components/Game/Popups/gameResultsPopup';
import { mockedGameIssues } from "__mocks__/mockedData";
import { fireEvent } from "@testing-library/dom";

export const gameResultsPopupProps = {
    onLeaveRoom: jest.fn(),
    gameIssues: mockedGameIssues,
};

describe('GameResultsPopup component tests', () => {
    it('renders Game results on stop Game Btn click', async () => {
                
        const { getByText, findByText } = render(<GameResultsPopup {...gameResultsPopupProps} />);

        const stopGameBtn = getByText('Stop Game');
        expect(stopGameBtn).toBeVisible();
        fireEvent.click(stopGameBtn);
        const gameResults = await findByText('Game results');
        expect(gameResults).toBeVisible();
       
    });


    it('no popup if Game Btn is not clicked', () => {
        const { queryByText } = render(<GameResultsPopup {...gameResultsPopupProps} />);       
        expect(queryByText('Game results')).not.toBeInTheDocument();
       
    });

});
