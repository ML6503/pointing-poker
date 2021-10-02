import { cardDecks, sequences } from 'utils/configs';
import {
  IGameIssue,
  IGameSettings,
  IssueData,
  issuePrevNext,
} from 'utils/interfaces';

export const issueCreate = (
  state: IGameSettings,
  issue: IssueData,
): IGameSettings => {
  const issues = [ ...state.issues ];
  issues.push({
    issueName: issue.issueName,
    priority: issue.priority,
    issueDescription: issue.issueDescription,
  });
  return {
    ...state,
    issues: issues,
  };
};

export const sequenceCreate = (
  state: IGameSettings,
  sequence: Array<string>,
): IGameSettings => {

  return {
    ...state,   
    customSequence: sequence,
  };
};

export const issueChanged = (
  state: IGameSettings,
  newIssues: Array<IGameIssue>,
): IGameSettings => {
  return {
    ...state,
    issues: newIssues,
  };
};

export const timerChange = (
  state: IGameSettings,
  isTimer: boolean,
): IGameSettings => {
  const timer = { ...state.timer };
  if (isTimer) {
    timer.isTimer = true;
  } else {
    timer.isTimer = false;
    timer.time = 0;
    // timer.minutes = 0;
    // timer.seconds = 0;
  }
  return {
    ...state,
    timer: timer,
  };
};

const timeToMinutes = (time: number) => {
  return Math.floor(time / 1000 / 60);
};

const minutesToTime = (time: string) => {
  return +time * 60 * 1000;
};

const timeToSeconds = (time: number) => {
  return Math.floor((time / 1000) % 60);
};

const secondsToTime = (time: string) => {
  return +time * 1000;
};

export const timeChange = (
  state: IGameSettings,
  timerData: string,
  dimension: string,
): IGameSettings => {
  const timer = { ...state.timer };
  let newTime = 0;
  if (dimension === 'minutes') {
    newTime =
      minutesToTime(timerData) +
      secondsToTime(timeToSeconds(timer.time).toString());
    timer.time = newTime;
  }

  if (dimension === 'seconds') {
    newTime =
      minutesToTime(timeToMinutes(timer.time).toString()) +
      secondsToTime(timerData);
    timer.time = newTime;
  }
  return {
    ...state,
    timer: timer,
  };
};

export const autoJoinChange = (
  state: IGameSettings,
  isAutoJoin: boolean,
): IGameSettings => {
  return {
    ...state,
    isAutoJoin: isAutoJoin,
  };
};

export const selectCard = (
  state: IGameSettings,
  choice: string,
  selectName: string,
): IGameSettings => {
  const card = { ...state.card };
  card[selectName] = choice;

  return {
    ...state,
    card: card,
  };
};

export const selectCardSequence = (
  cardNumber: number,
  choice: string,
  customSequence: Array<string>
): Array<string> => {
  let chosenSeq = [] as Array<string>;

  const seq = sequences.filter((item) => item.name === choice);
  if (seq.length) {
    if(choice === 'Custom sequence') {
      chosenSeq = Array.from(
        { length: cardNumber },
        (_, i) => customSequence[i],
      );
    } else {
      chosenSeq = Array.from(
        { length: cardNumber },
        (_, i) => seq[0].sequence[i],
      );
    }

    
  }
  return chosenSeq;
};

export const selectCardDeck = (
  cardNumber: number,
  choice: string,
): Array<string> => {
  let chosenDeck = [] as Array<string>;

  const deck = cardDecks.filter((item) => item.name === choice);

  if (deck.length) {
    chosenDeck = Array.from({ length: cardNumber }, (_, i) => deck[0].deck[i]);
  }

  return chosenDeck;
};

export const sprintNameChange = (state: IGameSettings, sprintName: string) => {
  return {
    ...state,
    sprintName: sprintName,
  };
};

export const checkValidateIssue = (
  name: string,
  issues: IssueData[],
): boolean => {
  const isValid =
    (issues && issues.some((issue) => issue.issueName === name)) ||
    name.length < 1;
  return isValid;
};

export const generateErrorName = (
  name: string,
  issues: IssueData[],
): string => {
  const errorLength =
    name.length < 1 ? 'the name must be longer than 1 character' : 'ok';
  const errorName =
    checkValidateIssue(name, issues) &&
    'there is an issue with this name, change the name';
  return errorLength || errorName;
};
