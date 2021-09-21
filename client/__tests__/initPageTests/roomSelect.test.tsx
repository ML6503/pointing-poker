/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';

import { fireEvent, within, cleanup, } from "@testing-library/react";
import { render, screen } from '../../test-utils';


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
    // onRoomSelect: (room: IRoomCreateData) => void;
    onRoomSelect: () => void;
  }
  
describe('RoomsSelect element from Init Page', () => {
    // let  expectedProps: RoomSelectProps;
    let  expectedProps;
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
        expect(roomSelectInput).toBeEmptyDOMElement();
        
    });
    test('should render existed rooms names on select input click', () => {        
        
        const { getByTestId, getByRole } = render(<RoomSelect {...expectedProps} />);
       
        const roomSelectInput = getByTestId("room-select-input");
        fireEvent.mouseDown(getByRole('button'));
        const listbox = within(getByRole('listbox'));
        // expect(listbox).toBe([expectedProps.rooms[0].roomId, expectedProps.rooms[1].roomId]);
        fireEvent.click(listbox.getByText(expectedProps.rooms[1].roomId));
        expect(roomSelectInput).toHaveValue(expectedProps.rooms[1].roomName);
    });
});
