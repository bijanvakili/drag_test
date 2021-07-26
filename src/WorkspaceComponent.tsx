import * as React from "react";
import * as d3 from "d3-selection";
import * as d3drag from "d3-drag";

import { ApiContext } from "./api";
import { VertexMap, Vertex, Position } from "./models";

const radius = 25;
const textPadding = radius / 4;

interface State {
  receivedVertices: boolean;
  vertices: VertexMap;
}

function makeInitialState(): State {
  return {
    receivedVertices: false,
    vertices: {},
  };
}

type D3Svg = d3.Selection<SVGSVGElement, any, d3.BaseType, any>;
type MoveVertexFunc = (id: string, position: Position) => void;

function render(svg: D3Svg, vertices: VertexMap, onMoveNode: MoveVertexFunc) {
  svg
    .selectAll<SVGGElement, Vertex>("g")
    .data(Object.values(vertices), (v) => v.id)
    .join((enter) => {
      const group = enter.append("g");
      group.call(
        d3drag
          .drag<SVGGElement, Vertex>()
          .on("start", function (this) {
            d3.select(this).classed("node-dragging", true);
          })
          .on("drag", function (this, ev) {
            d3.select(this).attr("transform", `translate(${ev.x} ${ev.y})`);
          })
          .on("end", function (this, ev, n) {
            d3.select(this).classed("node-dragging", false);
            onMoveNode(n.id, { x: ev.x, y: ev.y });
          })
      );
      group
        .append("circle")
        .attr("class", "node")
        .attr("r", radius)
        .attr("cx", 0)
        .attr("cy", 0);
      group
        .append("text")
        .attr("class", "node-label")
        .attr("x", 0)
        .attr("y", textPadding)
        .text((n) => n.id);
      return group;
    })
    .attr("transform", (v) => `translate(${v.position.x} ${v.position.y})`);
}

export const WorkspaceComponent: React.FC = () => {
  const [state, setState] = React.useState(makeInitialState);
  const apiContext = React.useContext(ApiContext);
  const api = apiContext.api;
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (svgRef.current === null) {
      return;
    }

    const onMoveNode = (id: string, position: Position) => {
      api.saveVertex({ id, position });
      setState({
        ...state,
        vertices: {
          ...state.vertices,
          [id]: {
            id,
            position,
          },
        },
      });
    };

    const svg = d3.select(svgRef.current as SVGSVGElement);
    render(svg, state.vertices, onMoveNode);
  }, [svgRef.current]);

  if (!state.receivedVertices) {
    api.onReceiveVertices((vertices) => {
      setState({
        receivedVertices: true,
        vertices: vertices.reduce(
          (accum, v) => ({
            ...accum,
            [v.id]: v,
          }),
          {}
        ),
      });
    });
    api.connect();
  }

  return (
    <div className="row workspace">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={window.innerWidth}
        height={window.innerHeight}
      ></svg>
    </div>
  );
};
