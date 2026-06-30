import { JsonRow, JsonValue } from "./types";

function getRowType(value: JsonValue): "object" | "array" | "primitive" {
  if (Array.isArray(value)) {
    return "array";
  }

  if (typeof value === "object" && value !== null) {
    return "object";
  }

  return "primitive";
}

function isExpandable(value: JsonValue): boolean {
  return typeof value === "object" && value !== null;
}

export function flattenJson(
  value: JsonValue,
  defaultExpandedDepth: number,
  expandedPaths: Set<string>,
  collapsedPaths: Set<string>,
  depth = 0,
  keyName?: string,
  path = "root"
): JsonRow[] {
  const type = getRowType(value);

  const row: JsonRow = {
    id: path,
    keyName,
    value,
    depth,
    type,
    path,
    isExpandable: isExpandable(value),
  };

  const rows: JsonRow[] = [row];

  const shouldExpand =
    row.isExpandable &&
    !collapsedPaths.has(path) &&
    (depth < defaultExpandedDepth || expandedPaths.has(path));

  if (!shouldExpand) {
    return rows;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      rows.push(
        ...flattenJson(
          item,
          defaultExpandedDepth,
          expandedPaths,
          collapsedPaths,
          depth + 1,
          String(index),
          `${path}.${index}`
        )
      );
    });
  } else if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([childKey, childValue]) => {
      rows.push(
        ...flattenJson(
          childValue,
          defaultExpandedDepth,
          expandedPaths,
          collapsedPaths,
          depth + 1,
          childKey,
          `${path}.${childKey}`
        )
      );
    });
  }

  return rows;
}
