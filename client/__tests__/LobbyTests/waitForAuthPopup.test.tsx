/**
 * @jest-environment jsdom
 */
import * as React from "react";
export * from '@testing-library/react';
import { render } from '../../test-utils';

import WaitForAuthPopup from '../../components/Lobby/popups/waitForAuthPopup';

describe('WaitForAuthPopup element renders all inner elements', () => {
    it('renders correct dialogTitle and text when isVoting', () => {
                
        const { getByText } = render(<WaitForAuthPopup isVoting={true} />);

        const dialogTitle = getByText('Please wait for authorization');
        expect(dialogTitle).toBeVisible();

        // const dialogText = getByText('voting in process.');
        // expect(dialogText).toBeVisible();
       
    });

});

describe('WaitForAuthPopup is not beeing rendered when Game is not started elements', () => {
    it('no popup', () => {
        const { queryByText } = render(<WaitForAuthPopup isVoting={false}  />);
        // expect(queryByText('voting in process.')).not.toBeInTheDocument();
        expect(queryByText('Please wait for authorization')).not.toBeInTheDocument();
       
    });

});
