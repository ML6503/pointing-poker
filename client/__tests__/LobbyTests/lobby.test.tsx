/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';
import { fireEvent, cleanup, within, waitFor } from "@testing-library/react";

import { render } from '../../test-utils';
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

  jest.mock('next/router');


const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe.skip('Lobby tests', () => {
  const mockReplace = jest.fn()
  const mockedRoomId = 'jkjgh5df2FD';
  useRouter.mockImplementationOnce(() => ({
    query: { lobby: mockedRoomId },
    route: '/lobby/mockedRoomId',
    pathname: '/[lobby]',
    replace: mockReplace,
  }));

    it("should render Lobby", () => {

      const user = {
        username: 'asd_fffA',
        userSurname: 'test Surname',
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
