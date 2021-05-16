import * as React from "react";
import * as d3 from "d3-selection";
import * as d3drag from "d3-drag";

const radius = 25;
const diameter = radius * 2;
const margin = radius * 1.5;
const textPadding = radius / 4;
const innerNodePadding = radius * 2;

interface Position {
  x: number;
  y: number;
}
interface Node {
  id: string;
  position: Position;
}

interface NodeMap {
  [key: string]: Node;
}

interface State {
  nodes: NodeMap;
}

function makeInitialState() {
  const state: State = {
    nodes: {},
  };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const id = `${i * 3 + j + 1}`;
      state.nodes[id] = {
        id,
        position: {
          x: margin + i * (diameter + innerNodePadding),
          y: margin + j * (diameter + innerNodePadding),
        },
      };
    }
  }

  return state;
}

type D3Svg = d3.Selection<SVGSVGElement, any, d3.BaseType, any>;
type MoveNodeFunc = (id: string, position: Position) => void;

function render(svg: D3Svg, nodes: NodeMap, onMoveNode: MoveNodeFunc) {
  svg
    .selectAll<SVGGElement, Node>("g")
    .data(Object.values(nodes), (n) => n.id)
    .join((enter) => {
      const group = enter.append("g");
      group.call(
        d3drag
          .drag<SVGGElement, Node>()
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
    .attr("transform", (n) => `translate(${n.position.x} ${n.position.y})`);
}

export const WorkspaceComponent: React.FC = () => {
  const [state, setState] = React.useState(makeInitialState);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (svgRef.current === null) {
      return;
    }

    const onMoveNode = (id: string, position: Position) => {
      setState({
        nodes: {
          ...state.nodes,
          [id]: {
            id,
            position,
          },
        },
      });
    };

    const svg = d3.select(svgRef.current as SVGSVGElement);
    render(svg, state.nodes, onMoveNode);
  }, [svgRef.current]);

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
