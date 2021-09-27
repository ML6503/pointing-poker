import { waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { screen } from '../../__mocks__/test-utils';

jest.mock('next/image', () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img {...props} />
    },
  }));

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error

  });

describe('pages rendering', () => {
  
  it(' renders Lobby page', async () => {
    const mockedId = 'RYhJNxUhsXuxvuj84WwMJ';
    const { render } =  await getPage({
      route: `/${mockedId}`, 
      
      router: (router) => {
        router.events.on = jest.fn();
        router.events.off = jest.fn();
        router.query = { lobby: mockedId };
        router.pathname = '/[lobby]';
        
        return router;
      },
    });

     render();

    await waitFor(() => {
      expect(screen.getByText('Lobby')).toBeInTheDocument();
    }); 

  });

  it('prevents to render Game page on link without data from server passed via sockets', async () => {
    const mockedId = 'RYhJNxUhsXuxvuj84WwMJ';
      const { render } = await getPage({ 
        route: `/${mockedId }/game`,
        router: (router) => {
          router.events.on = jest.fn();
          router.events.off = jest.fn();
          router.events.emit = jest.fn();
          router.query = { lobby: mockedId };
          router.pathname = '/[lobby]/game';
          
          return router;
        },
        
      });
      render();
      await waitFor(() => {
        expect(screen.getByText('404')).toBeInTheDocument();
      });
  });

});
