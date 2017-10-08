import {Game} from '../game/game';

export type SlideData = {
  setTitle(string): void,
  setSubtitle(string): void,
  showGame(skipAnimation?): void,
  hideGame(): void,
  removeGame(): void,
  showTool(imageUrl: string, ur: string): void,
  hideTool(): void,
  game: Game,
  wrapper: Element,
  makeGameFullScreen(): void,
  resetGamePosition(): void,
  moveGameTo(x: number, y: number, width: number)
}
