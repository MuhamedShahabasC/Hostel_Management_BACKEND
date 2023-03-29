export interface IRoom {
  number: number;
  code: string;
  occupant: any; // Change this after doing student schema;
  occupiedOn: Date;
}

export interface IBlock {
  name: string;
  code: string;
  rooms: IRoom[];
  occupancy: number;
}
