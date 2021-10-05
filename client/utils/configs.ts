import { IGameIssue } from './interfaces';

export const roles = {
  dealer: 'dealer',
  member: 'member',
  observer: 'observer',
};

export const errorInfo = {
  nameError: {
    ok: 'Correct',
    bad: 'Incorrect entry',
    validator: 3,
  },
  surnameError: {
    ok: 'Correct',
    bad: 'Incorrect entry',
    validator: 3,
  },
  roomNameError: {
    ok: 'Correct',
    bad: 'Incorrect entry',
    validator: 3,
  },
};

export const issueErrorConfig = {
  ok: 'Correct',
  noEntry: 'issue name must be at least 1 character',
  noEntryValidator: 1,  
  existIssue: 'this issue name alreasy exists',
};

export const sequenceErrorConfig = {
  ok: 'correct',
  noEntry: 'enter from 1 to 3 any non-whitespace characters each, except 999',
  noEntryValidator: 1,
  validator: 3,
  notAllEntryValidator: 'all 10 sequence options must be filled - 999 is not allowed for voting'
};

export const userInitData = {
  username: {
    nameData: '',
    statusData: false,
  },
  userSurname: {
    nameData: '',
    statusData: false,
  },
  avatar: '',
};

export const roomInitData = {
  room: {
    roomName: '',
    roomId: '',
  },
  statusData: false,
};

export const gameCardSur = [
  '/cards/card_1.png',
  '/cards/card_2.png',
  '/cards/card_3.png',
  '/cards/card_4.png',
  '/cards/card_5.png',
  '/cards/card_6.png',
  '/cards/card_7.png',
  '/cards/card_8.png',
  '/cards/card_9.png',
  '/cards/card_10.png',
  '/cards/card_pot.png',
];

export const cardDecks = [
  {
    name: 'Surrealism',
    deck: gameCardSur,
  },
];

export const seqLength = 10;

// export const fibonacci_Seq = [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ];
export const fibonacci_Seq = [ '1', '2', '3', '5', '8', '13', '21', '34', '55', '89' ];
// export const doubleNum_Seq = [ 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 ];
export const doubleNum_Seq = [ '1', '2', '4', '8', '16', '32', '64', '128', '256', '512' ];
export const custom_Seq = Array(seqLength).fill("");

export const maxCardNumber = 9;
export const minCardNumber = 3;
export const nonVoted = '999'; //if pot used or player do not want / cannot vote at all

export const sequences = [
  {
    name: 'Fibonacci numbers',
    sequence: fibonacci_Seq,
  },
  {
    name: 'Double numbers',
    sequence: doubleNum_Seq,
  },
  {
    name: 'Custom sequence',
    sequence: custom_Seq,
  }
];

export const gameSelectOptions = {
  sequence: 'sequence',
  cardDeck: 'cardDeck',
};

export const initGameSettings = {
  sprintName: '',
  issues: [] as Array<IGameIssue>,
  timer: {
    isTimer: false,
    time: 0,
  },
  card: {
    cardDeck: cardDecks[0].name,
    sequence: sequences[0].name,
    cardNumber: 4,
    cardNumberStart: 0,
    cardTurn: false,
  },
  isAutoJoin: false,
  isStarted: true,
  isVoting: false,  
  customSequence: [],
};

export const timerValid = {
  minutesMax: 3 * 60 * 1000,
  secondsMin: 10 * 1000,
};

//1st opt
//  /^\w(?!999$)\S{0,2}$ /g
//2nd opt
// /^(?!999$)\w\S{0,2}$/g
// corr below
// /(?!999$)^[^\s]{1,3}$/g
export const customSeqElRegex = /(?!999$)^[^\s]{1,3}$/g;