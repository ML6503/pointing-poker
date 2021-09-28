/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';

import { fireEvent, within, cleanup, waitForElementToBeRemoved, } from "@testing-library/react";
import { render, screen } from '../../__mocks__/test-utils';


import { RoomSelect } from '../../components/InitPage/roomSelect';
import { IRoomCreateData, IRoomInfo } from "utils/interfaces";

beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach(() => {
    cleanup();
  });

interface RoomSelectProps {
    rooms: Array<IRoomInfo>;
    onRoomSelect: (room: IRoomCreateData) => void;    
  }
  
describe('RoomsSelect element from Init Page', () => {
    // let  expectedProps: RoomSelectProps;
    let  expectedProps: RoomSelectProps;
    beforeEach(() => {
        expectedProps = {
            rooms: [
                {
                    roomId: 'ad12dfUJSdf',
                    roomName: 'Brilliant'
                },
                {
                    roomId: 'jkjgh5df2FD',
                    roomName: 'Afrodite'
                }
            ],
            onRoomSelect: jest.fn()
        };
    });

    test('should render label name and select input', () => {        
        
        const { getByTestId, getByText } = render(<RoomSelect {...expectedProps} />);
        const roomSelectInputLabel = getByText('Select Room');
        const roomSelectInput = getByTestId("room-select-input");
        expect(roomSelectInputLabel).toBeVisible();
        expect(roomSelectInput ).toBeVisible();    
        
    });
    
    test('should render existed rooms names on select input click', async () => {        
       
        const { getByTestId, getByRole, getByText } = render(<RoomSelect {...expectedProps} />);
       
        const roomSelectInput = getByTestId("room-select-input");
        fireEvent.mouseDown(getByRole('button'));
        const listbox = within(getByRole('listbox'));
        fireEvent.click(listbox.getByText(expectedProps.rooms[1].roomName));
        
         // Close the select using Escape or Tab or clicking away
        fireEvent.keyDown(document.activeElement, {
            key: "Escape",
            code: "Escape"
          });
           // Wait for Menu to close
        await waitForElementToBeRemoved(getByText("None"));
        // Verify selections
        expect(roomSelectInput).toHaveTextContent(
            expectedProps.rooms[1].roomName
        );
    });
});
