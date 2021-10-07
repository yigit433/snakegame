export interface Options {
  snake_head: string;
  snake_tail: string;
  background: string;
  food: string;
  width: number;
  height: number;
}
export interface MapPart {
  part: string;
  x: number;
  y: number;
}
export interface Data {
  ID: string;
  score: number;
  parts: MapPart[];
  createdAt: Date | number;
}
