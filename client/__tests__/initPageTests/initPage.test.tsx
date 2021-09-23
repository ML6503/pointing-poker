/**
 * @jest-environment jsdom
 */

// import '@testing-library/jest-dom';
import * as React from "react";
export * from '@testing-library/react';
import { useRouter } from 'next/router';
import { fireEvent, cleanup } from "@testing-library/react";
import { render, screen } from '../../test-utils';
import { InitPage } from '../../components/InitPage/initPage';

// jest.mock('next/router/');
afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

// const originalEnv = process.env

// beforeAll(() => {
//   // Setup the injected process environment
//   process.env.__NEXT_IMAGE_OPTS = JSON.stringify({
//   deviceSizes: [320, 420, 768, 1024, 1200],
//   iconSizes: [16, 32, 48],
//   imageSizes: [16, 32, 48],
//   })
// });

// afterEach(() => {
//   // Reset the process environment variables
//   process.env = originalEnv
// });

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
        // const { getByTestId } = render(InitPage({ rooms }));
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
});
