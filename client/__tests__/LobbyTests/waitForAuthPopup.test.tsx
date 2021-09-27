/**
 * @jest-environment jsdom
 */
import * as React from "react";
export * from '@testing-library/react';
import { act, render } from '../../__mocks__/test-utils';

import WaitForAuthPopup from '../../components/Lobby/popups/waitForAuthPopup';

describe('WaitForAuthPopup element renders all inner elements', () => {
    it('renders correct dialogTitle and text when isVoting', async () => {
        const promise = Promise.resolve();
     
        const { getByText } = render(<WaitForAuthPopup isVoting={true} />);

        const dialogTitle = getByText('Please wait for authorization');
        expect(dialogTitle).toBeVisible();
        await act(() => promise);
    });

});

describe('WaitForAuthPopup is not beeing rendered when Game is not started elements', () => {
    it('no popup', async () => {
        const promise = Promise.resolve();
        const { queryByText } = render(<WaitForAuthPopup isVoting={false}  />);       
        expect(queryByText('Please wait for authorization')).not.toBeInTheDocument();
        await act(() => promise);
    });

});
