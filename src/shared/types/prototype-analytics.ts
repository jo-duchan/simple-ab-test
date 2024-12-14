export interface UserActionData {
  [pageId: string]: {
    count: number;
    positions: { x: number; y: number }[];
  };
}

export interface TimeSpentData {
  [pageId: string]: number;
}
