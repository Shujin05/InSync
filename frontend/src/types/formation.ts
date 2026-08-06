export type Dancer = {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
};

export type Formation = {
  id: string;
  name: string;
  dancers: Dancer[];
};