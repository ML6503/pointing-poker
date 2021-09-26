/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';
import { fireEvent, cleanup, within, waitFor } from "@testing-library/react";
import { render, screen } from '../../test-utils';
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      lobby: 'dkfsl_F5ddd',
    },
    route: '/mockedRoomId',
    pathname: '/[lobby]',
    beforePopState: require('next/router'),
  })),
}));

import Lobby from '../../components/Lobby/lobby';


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



describe.skip('Lobby page tests', () => {
  // const mockReplace = jest.fn()
  // const mockedRoomId = 'JolH-PxZl2-e9RLsuyc-9';
  // useRouter.mockImplementationOnce(() => ({
  //   query: { lobby: mockedRoomId },
  //   route: '/mockedRoomId',
  //   pathname: '/[lobby]',
  //   replace: mockReplace,
  // }));

    it("should render Lobby", async () => {

      const user = {
        username: 'Test Name',
        userSurname: 'Test Surname',
        avatar: '',
        id: 'ffd_ddd23L',
        userRole: 'member',
        dealer: false,
        score: '',
      }
        const lobbyInfo = {
          chat: [{ user, message: '' }],
          users: [user],
          error: '',
        }
    
      render(<Lobby lobbyInfo={ lobbyInfo } />);
      });

 
});
