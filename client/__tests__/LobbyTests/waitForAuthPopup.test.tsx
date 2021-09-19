/**
 * @jest-environment jsdom
 */
import * as React from "react";
export * from '@testing-library/react';
import { render } from '../../test-utils';

import WaitForAuthPopup from '../../components/Lobby/popups/waitForAuthPopup';

describe('WaitForAuthPopup element renders all inner elements', () => {
    it('renders correct dialogTitle and text when isVoting && !isAutoJoin', () => {
                
        const { getByText } = render(<WaitForAuthPopup isGameStarted={true} isVoting={true} isAutoJoin={false} />);

        const dialogTitle = getByText('Please wait for authorization.');
        expect(dialogTitle).toBeVisible();

        const dialogText = getByText('voting in process.');
        expect(dialogText).toBeVisible();
       
    });

    it('renders correct dialogTitle and text when !isVoting && !isAutoJoin', () => {
                
        const { getByText, queryByText } = render(<WaitForAuthPopup isGameStarted={true} isVoting={false} isAutoJoin={false} />);

        const dialogTitle = getByText('Please wait for authorization.');
        expect(dialogTitle).toBeVisible();

        expect(queryByText('voting in process.')).not.toBeInTheDocument();
       
    });

    it('renders correct dialogTitle and text when isVoting && isAutoJoin', () => {
                
        const { getByText } = render(<WaitForAuthPopup isGameStarted={true} isVoting={true} isAutoJoin={true} />);

        const dialogTitle = getByText('Please wait');
        expect(dialogTitle).toBeVisible();

        const dialogText = getByText('voting in process.');
        expect(dialogText).toBeVisible();
       
    });
});

describe('WaitForAuthPopup is not beeing rendered when Game is not started elements', () => {
    it('no popup', () => {
        const { queryByText } = render(<WaitForAuthPopup isGameStarted={false} isVoting={false} isAutoJoin={true} />);
        expect(queryByText('voting in process.')).not.toBeInTheDocument();
        expect(queryByText('Please wait for authorization.')).not.toBeInTheDocument();
        expect(queryByText('Please wait')).not.toBeInTheDocument();
    });

});
