/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';
import { useRouter } from 'next/router';
import { fireEvent, cleanup, within, waitForElementToBeRemoved } from "@testing-library/react";
import { render, screen } from '../../test-utils';
import { InitPage } from '../../components/InitPage/initPage';



// jest.mock('next/router/');

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });


jest.mock('next/image', () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img {...props} />
    },
  }));
  

describe('init page elements', () => {
    
    it("should render InitPage", () => {
        const rooms = []
        render(<InitPage rooms={ rooms } />);
      });


    it('renders default state', () => {
        const rooms = []
        const { getByTestId, queryAllByTestId } = render(<InitPage rooms={ rooms } />);

        const pokerImg = getByTestId("poker-image");
        expect(pokerImg).toBeVisible();

        const startGameBtn = getByTestId("start-new-game-btn");
        const userDialog = queryAllByTestId("user-dialog");
        const roomConnectBtn = getByTestId("room-connect-btn");
        const roomSelectInput = getByTestId("room-select-input");   

        expect(startGameBtn).toBeInTheDocument();
        expect(userDialog).toHaveLength(0);
        expect(roomConnectBtn).toBeInTheDocument();
        expect(roomSelectInput).toBeVisible();
    });

    it('connect to room btn click opens user dialog with room selected', async () => {        
        const rooms = [{
            roomId: 'ad12dfUJSdf',
            roomName: 'Brilliant'
        },
        {
            roomId: 'jkjgh5df2FD',
            roomName: 'Afrodite'
        }];

        const { getByTestId, getByRole, findAllByTestId, getByLabelText } = render(<InitPage rooms={ rooms } />);
       
        fireEvent.mouseDown(getByLabelText("Select Room"));
        const listbox = within(getByRole('listbox'));
        fireEvent.click(listbox.getByText(rooms[1].roomName));
        
        // Close the select using Escape or Tab or clicking away
        fireEvent.keyDown(document.activeElement, {
            key: "Escape",
            code: "Escape"
          });
       

        const roomConnectBtn = getByTestId("room-connect-btn");
        fireEvent.click(roomConnectBtn);
        const userDialog = await findAllByTestId("user-dialog");
        expect(userDialog.length).toBe(1);
    });
});
