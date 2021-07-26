export interface Position {
  x: number;
  y: number;
}

export interface Vertex {
  id: string;
  position: Position;
}

export interface VertexMap {
  [key: string]: Vertex;
}
