import { act,  waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { screen } from '../../test-utils';

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

describe('basics route rendering', () => {
  it('router renders init page', async () => {
    const { render } =  await getPage({
      route: '/',
    });

     render();

    await waitFor(() => {
      expect(screen.getByText('Poker Planning')).toBeInTheDocument();
    });
    
    
  });

  it('router renders error page', async () => {
    const mockedId = 'no_such_page';
      const { render } = await getPage({ 
        route: `/${mockedId}`,
        
      });
      render();
      await waitFor(() => {
        expect(screen.getByText('404')).toBeInTheDocument();
      });
  });

});
