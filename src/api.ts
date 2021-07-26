import * as React from "react";
import { io, Socket } from "socket.io-client";

import { Vertex } from "./models";

type ReceiveVerticesFunc = (vertices: Vertex[]) => void;

interface ApiInterface {
  onReceiveVertices: (cb: ReceiveVerticesFunc) => void;
  connect: () => void;
  saveVertex: (v: Vertex) => void;
}

export class DisabledApi implements ApiInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onReceiveVertices(cb: ReceiveVerticesFunc): void {
    throw new Error("not implemented!");
  }
  public connect(): void {
    throw new Error("not implemented!");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public saveVertex(v: Vertex): void {
    throw new Error("not implemented!");
  }
}

export class Api implements ApiInterface {
  private socket: Socket;

  constructor() {
    this.socket = io({ autoConnect: false });
    this.socket.on("connect", () => {
      console.log("connected!");
    });
  }

  public onReceiveVertices(cb: ReceiveVerticesFunc): void {
    this.socket.on("vertices", (vertices) => {
      cb(
        vertices.map((v: any) => ({
          id: v.id,
          position: {
            x: v.position_x,
            y: v.position_y,
          },
        }))
      );
    });
  }

  public connect(): void {
    this.socket.connect();
  }

  // saves a vertex to the server
  public saveVertex(vertex: Vertex): void {
    this.socket.emit("vertex_update", {
      id: vertex.id,
      position_x: vertex.position.x,
      position_y: vertex.position.y,
    });
  }
}

interface ApiContextType {
  api: ApiInterface;
}

export const ApiContext = React.createContext<ApiContextType>({
  api: new DisabledApi(),
});
