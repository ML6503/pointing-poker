/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';

import { fireEvent } from "@testing-library/react";
import { render, screen } from '../../test-utils';


import { RoomSelect } from '../../components/InitPage/roomSelect';
import { IRoomCreateData, IRoomInfo } from "utils/interfaces";


interface RoomSelectProps {
    rooms: Array<IRoomInfo>;
    // onRoomSelect: (room: IRoomCreateData) => void;
    onRoomSelect: () => void;
  }
  
describe.skip('RoomsSelect element from Init Page', () => {
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
    test('should render label name and select input', async () => {        
        
        const { findByTestId, findByText } = render(<RoomSelect {...expectedProps} />);
        const roomSelectInputLabel = await screen.findByText('Select Room');
        const roomSelectInput = await screen.findByTestId("room-select-input");
        expect(roomSelectInputLabel).toBeVisible();
        expect(roomSelectInput).toBe('');
        
    });
    test('should render existed rooms names on select input click', () => {        
        
        const { getByTestId } = render(<RoomSelect {...expectedProps} />);
       
        const roomSelectInput = getByTestId("room-select-input");
        fireEvent.click(roomSelectInput);
        expect(roomSelectInput).toBe([expectedProps.rooms[0].roomId, expectedProps.rooms[1].roomId]);
    });
});
