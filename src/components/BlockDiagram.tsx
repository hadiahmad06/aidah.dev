import type { Diagram, DiagramNode } from "@/data/projects";

type Rect = { x: number; y: number; w: number; h: number; cx: number; cy: number };
type Point = [number, number];

const PAD = 4;
const BOX_HEIGHT = 56;
const ARROW = 7;

function layout(diagram: Diagram, vertical: boolean) {
  // On narrow screens the grid is transposed, so a left-to-right chain reads top-to-bottom
  const place = (node: DiagramNode) =>
    vertical ? { col: node.row, row: node.col } : { col: node.col, row: node.row };

  const cols = 1 + Math.max(...diagram.nodes.map((node) => place(node).col));
  const rows = 1 + Math.max(...diagram.nodes.map((node) => place(node).row));
  const boxWidth = vertical && cols === 1 ? 280 : 156;
  const gapX = vertical ? 20 : 28;
  const gapY = vertical ? 26 : 36;

  const rects = new Map<string, Rect>();
  for (const node of diagram.nodes) {
    const { col, row } = place(node);
    const x = PAD + col * (boxWidth + gapX);
    const y = PAD + row * (BOX_HEIGHT + gapY);
    rects.set(node.id, { x, y, w: boxWidth, h: BOX_HEIGHT, cx: x + boxWidth / 2, cy: y + BOX_HEIGHT / 2 });
  }

  return {
    rects,
    width: cols * boxWidth + (cols - 1) * gapX + 2 * PAD,
    height: rows * BOX_HEIGHT + (rows - 1) * gapY + 2 * PAD,
  };
}

// Wires leave and enter at the middle of the facing edges; anything diagonal takes one right-angle turn
function route(a: Rect, b: Rect): Point[] {
  const dx = Math.sign(b.cx - a.cx);
  const dy = Math.sign(b.cy - a.cy);
  if (dy === 0) return [[dx > 0 ? a.x + a.w : a.x, a.cy], [dx > 0 ? b.x : b.x + b.w, b.cy]];
  if (dx === 0) return [[a.cx, dy > 0 ? a.y + a.h : a.y], [b.cx, dy > 0 ? b.y : b.y + b.h]];
  return [[dx > 0 ? a.x + a.w : a.x, a.cy], [b.cx, a.cy], [b.cx, dy > 0 ? b.y : b.y + b.h]];
}

function Wire({ points, dashed }: { points: Point[]; dashed?: boolean }) {
  const [tipX, tipY] = points[points.length - 1];
  const [prevX, prevY] = points[points.length - 2];
  const length = Math.hypot(tipX - prevX, tipY - prevY);
  const ux = (tipX - prevX) / length;
  const uy = (tipY - prevY) / length;
  // Stop the line at the back of the arrowhead so the tip stays sharp
  const baseX = tipX - ux * ARROW;
  const baseY = tipY - uy * ARROW;
  const line = [...points.slice(0, -1), [baseX, baseY] as Point];

  return (
    <g className="stroke-accent fill-accent">
      <polyline
        points={line.map((point) => point.join(",")).join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <polygon
        stroke="none"
        points={`${tipX},${tipY} ${baseX - uy * 3.5},${baseY + ux * 3.5} ${baseX + uy * 3.5},${baseY - ux * 3.5}`}
      />
      <circle cx={points[0][0]} cy={points[0][1]} r={2.25} stroke="none" />
    </g>
  );
}

function Box({ node, rect }: { node: DiagramNode; rect: Rect }) {
  const wip = node.kind === "wip";
  return (
    <g>
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        rx={node.kind === "io" ? rect.h / 2 : 0}
        className={`fill-raised ${wip ? "stroke-ink-3" : "stroke-ink"}`}
        strokeWidth={1.25}
        strokeDasharray={wip ? "5 4" : undefined}
      />
      <text
        x={rect.cx}
        y={node.sub ? rect.cy - 3 : rect.cy + 4.5}
        textAnchor="middle"
        className="fill-ink font-sans"
        fontSize={13}
        fontWeight={600}
      >
        {node.label}
      </text>
      {node.sub && (
        <text x={rect.cx} y={rect.cy + 14} textAnchor="middle" className="fill-ink-2 font-mono" fontSize={10}>
          {node.sub}
        </text>
      )}
    </g>
  );
}

function DiagramSvg({ diagram, vertical }: { diagram: Diagram; vertical: boolean }) {
  const { rects, width, height } = layout(diagram, vertical);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`${diagram.caption}: ${diagram.nodes.map((node) => node.label).join(", ")}`}
      className="h-auto max-w-full"
    >
      {diagram.edges.map((edge) => (
        <Wire
          key={`${edge.from}-${edge.to}`}
          points={route(rects.get(edge.from)!, rects.get(edge.to)!)}
          dashed={edge.dashed}
        />
      ))}
      {diagram.nodes.map((node) => (
        <Box key={node.id} node={node} rect={rects.get(node.id)!} />
      ))}
    </svg>
  );
}

export default function BlockDiagram({ diagram, figure }: { diagram: Diagram; figure: number }) {
  const hasPlanned = diagram.nodes.some((node) => node.kind === "wip");
  return (
    <figure>
      <div className="hidden lg:block">
        <DiagramSvg diagram={diagram} vertical={false} />
      </div>
      <div className="lg:hidden">
        <DiagramSvg diagram={diagram} vertical />
      </div>
      <figcaption className="label mt-4">
        Fig. {figure} · {diagram.caption}
        {hasPlanned && " · dashed = not built yet"}
      </figcaption>
    </figure>
  );
}
