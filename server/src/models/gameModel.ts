import {
  IGameCard,
  IGameSettings,
  IGameIssue,
  IGameTimer,
  IPlayerChoice,
  IGameSettingsFromClient,
  IGamePlayer,
  IIssue,
  IGameStatus,
} from './interfaces';

export const nonVoted = 999;

interface GameInitProps {
  playerIds: Array<string>;
  client: IGameSettingsFromClient;
}

class Game {
  private id: string;
  private sprintName: string = '';
  private issues: Array<IGameIssue> = [];
  private card: IGameCard = null;
  private timer: IGameTimer = null;
  private isAutoJoin: boolean;
  private isStarted: boolean;
  private isVoting: boolean;

  constructor(roomId: string) {
    this.id = roomId;
  }

  gameInit = (props: GameInitProps): void => {
    props.client.issues.forEach((issue) => {
      const players = [] as Array<IGamePlayer>;
      props.playerIds.forEach((player) => {
        if (player) {
          const newPlayer = {
            player: player,
            choice: 0,
          };
          players.push(newPlayer);
        }
      });
      if (players.length) {
        const newIssue = {
          issue: { ...issue },
          players: players,
          score: [],
          totalScore: 0,
          amendedScore: 0,
        };
        this.issues.push(newIssue);
      }
    });
    this.sprintName = props.client.sprintName;
    this.card = { ...props.client.card };
    this.timer = { ...props.client.timer };
    this.isAutoJoin = props.client.isAutoJoin;
    this.isStarted = props.client.isStarted;
    this.isVoting = props.client.isVoting;
  };

  getGameId = (): string => {
    return this.id;
  };

  getGameInitData = (): IGameSettings => {
    const gameData = {
      sprintName: this.sprintName,
      timer: { ...this.timer },
      card: { ...this.card },
      issues: this.issues,
      isAutoJoin: this.isAutoJoin,
      isStarted: this.isStarted,
      isVoting: this.isVoting,
    };
    return gameData;
  };

  clearScoreAndChoices = (issue: IGameIssue): void => {
    if (issue.totalScore) {
      issue.totalScore = 0;
      issue.amendedScore = 0;
      issue.score = [];
      issue.players = issue.players.map((player) => ({
        player: player.player,
        choice: 0,
      }));
    }
  };

  setPlayerChoice = (playerChoice: IPlayerChoice): void => {
    const issueFound = this.issues.find(
      (issue) => issue.issue.issueName === playerChoice.issue,
    );
    if (issueFound) {
      this.clearScoreAndChoices(issueFound);
      const playerFound = issueFound.players.find(
        (player) => player.player === playerChoice.playerId,
      );
      if (playerFound) {
        playerFound.choice = playerChoice.playerChoice;
      }
    }
  };

  calculateIssueScore = (issueName: string): void => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
      const issueScore = gameIssue.players.reduce((arr, player) => {
        const choiceFound = arr.find((item) => item.choice === player.choice);
        if (choiceFound) {
          choiceFound.playerQuantity += 1;
        } else {
          const newScore = {
            choice: player.choice,
            playerQuantity: 1,
            totalPlayers: gameIssue.players.length,
          };
          arr.push(newScore);
        }
        return arr;
      }, []);

      const score = issueScore.map((item) => {
        const ratio = ((item.playerQuantity / item.totalPlayers) * 100).toFixed(
          2,
        );
        return {
          choice: item.choice,
          ratio: +ratio,
        };
      });
      gameIssue.score = score;
      const totalScore = score.reduce((acc, item) => {
        if (item.choice !== nonVoted) {
          return acc + item.choice * item.ratio;
        }
        return acc;
      }, 0);
      gameIssue.totalScore = +(totalScore / 100).toFixed(2);
    }
  };

  setIssueScore = (issueName: string): void => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
    }
  };

  getGameIssue = (issueName: string): IGameIssue | null => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
      const gameTaskCopy = {
        ...gameIssue,
        players: [...gameIssue.players],
        score: [...gameIssue.score],
      };
      return gameTaskCopy;
    }
    return null;
  };

  getGameIssues = (): Array<IGameIssue> => {
    return this.issues;
  };

  setVoting = (voting: boolean): void => {
    this.isVoting = voting;
  };

  getIsVoting = (): boolean => {
    return this.isVoting;
  };

  checkVoting = (issueName: string): Array<IGameIssue> | null => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );

    if (gameIssue) {
      const unvoted = gameIssue.players.filter((player) => !player.choice);
      if (!unvoted.length) return this.issues;
      return null;
    }
  };

  getCardTurnStatus = (): boolean => {
    return this.card.cardTurn;
  };

  addNewIssue = (issue: IIssue, playerIds: Array<string>): void => {
    const players = [] as Array<IGamePlayer>;
    playerIds.forEach((player) => {
      if (player) {
        const newPlayer = {
          player: player,
          choice: 0,
        };
        players.push(newPlayer);
      }
    });
    if (players.length) {
      const newIssue = {
        issue: issue,
        players: players,
        score: [],
        totalScore: 0,
        amendedScore: 0,
      };
      this.issues.push(newIssue);
    }
  };

  getTimer = (): IGameTimer => {
    return this.timer;
  };

  amendedIssueScore = (amendedIssue: IGameIssue): void => {
    const issueIndex = this.issues.findIndex(
      (issue) => issue.issue.issueName === amendedIssue.issue.issueName,
    );
    if (issueIndex >= 0) {
      this.issues.splice(issueIndex, 1, amendedIssue);
    }
  };

  addLatePlayer = (player: string): void => {
    const playerFound = this.issues.find((issue) =>
      issue.players.find((issuePlayer) => issuePlayer.player === player),
    );
    if (!playerFound) {
      const newPlayer = {
        player: player,
        choice: 0,
      };
      this.issues.forEach((issue) => issue.players.push(newPlayer));
    }
  };

  getGameStatus = (): IGameStatus => {
    return {
      isStarted: this.isStarted,
      isAutoJoin: this.isAutoJoin,
      isVoting: this.isVoting,
    };
  };

  playerLeave = (player: string): void => {
    this.issues.forEach((issue) => {
      issue.players = issue.players.filter(
        (issuePlayer) => issuePlayer.player !== player,
      );
    });
  };
}

export default Game;
