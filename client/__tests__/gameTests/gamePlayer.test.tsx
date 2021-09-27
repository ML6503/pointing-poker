import { render } from '../../__mocks__/test-utils';
import { mockedGamePlayerProps } from '__mocks__/mockedData';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      lobby: 'dkfsl_F5ddd',
    },    
    beforePopState: require('next/router'),
    push: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
    route: '/dkfsl_F5ddd/game', 
  })),
}));
const  { GamePlayer } = require('../../components/Game/gamePlayer');

  
  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

 
describe('game Player component', () => {
  jest.setTimeout(10000);

  it('renders GamePlayer main elements ', async () => {
    
  const { getByText, getByTestId } = render (<GamePlayer {...mockedGamePlayerProps} />);
        // game player component by id
        expect(getByTestId('game-player')).toBeInTheDocument();
        // btn to exit game
        expect(getByText('Exit')).toBeInTheDocument();
        // sprint heading
        expect(getByText(/sprint/i)).toBeInTheDocument();
        // dealer heading & his user-card
        expect(getByText('Dealer:')).toBeInTheDocument();
        expect(getByTestId('user-card')).toBeInTheDocument();
        // issues block 
        expect(getByText('Issues:')).toBeInTheDocument();      
  });

  it('GamePlayer renders timer if set by Dealer ', async () => {
    mockedGamePlayerProps.timer = {isTimer: true, time: 15000};
    const { getByText, getByTestId } = render (<GamePlayer {...mockedGamePlayerProps} />);
          // timer component by id
          expect(getByTestId('timer')).toBeInTheDocument();
          // 15 seconds passed by timer time
          expect(getByText(/15/i)).toBeInTheDocument(); 
    });
});
