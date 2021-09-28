/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';

import { fireEvent, within, cleanup  } from "@testing-library/react";
import { render, act } from '../../__mocks__/test-utils';

import { DialogInputBlock } from '../../components/InitPage/Dialog/dialogInputBlock';
import { IDialogUsers, IRoomCreateData } from 'utils/interfaces';


beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach( () => {
    cleanup();   
  });

  interface DialogInputBlockProps {
    changeUserData: (value: IDialogUsers) => void;
    changeRoomData?: (value: IRoomCreateData) => void;
    userInfo: IDialogUsers,
    roomInfo?: IRoomCreateData,
    newGame: boolean;
  }
  
describe('DialogInputBlock element from Init Page tests', () => {
    // let  expectedProps: RoomSelectProps;
    let  expectedProps: DialogInputBlockProps;
    beforeEach(() => {
        expectedProps = {
            changeUserData: jest.fn(),
            changeRoomData: jest.fn(),
            userInfo:{
                username: {nameData: '', statusData: false},
                userSurname: {nameData: '', statusData: false},
                avatar: '',
            },
            roomInfo: {
                room: {roomName: '', roomId: ''},                 
                statusData: false
            },
            newGame: true,
        };
    });
  
    test('should render 3 text inputs', async () => {        
        
        const { getByTestId } = render(<DialogInputBlock {...expectedProps} />);
        
        const roomCreateInput = getByTestId("room-create-input");       
        expect(roomCreateInput).toBeVisible();
        const nameCreateInput = getByTestId("name-create-input");       
        expect(nameCreateInput).toBeVisible();
        const surnameCreateInput = getByTestId('surname-create-input');
        expect(surnameCreateInput).toBeVisible();
       
    });
    
    test('should allow new names in inputs', () => {        
       
        const { getByTestId } = render(<DialogInputBlock {...expectedProps} />);
  
        const roomCreateInputWrapper = getByTestId("room-create-input");
        const roomCreateInput = within(roomCreateInputWrapper).getByRole('textbox') as HTMLInputElement;
        fireEvent.change(roomCreateInput, {target: {value: 'Breaze'}});   
        const nameCreateInputWrapper = getByTestId("name-create-input");
        const nameCreateInput = within(nameCreateInputWrapper).getByRole('textbox') as HTMLInputElement;
        fireEvent.change(nameCreateInput, {target: {value: 'John'}}); 
        const surnameCreateInputWrapper = getByTestId('surname-create-input');
        const surnameCreateInput = within(surnameCreateInputWrapper).getByRole('textbox') as HTMLInputElement;
        fireEvent.change(surnameCreateInput, {target: {value: 'Smith'}});
      
        expect(roomCreateInput).toHaveValue('Breaze');
        expect(nameCreateInput).toHaveValue('John');
        expect(surnameCreateInput).toHaveValue('Smith');        
    });
});
