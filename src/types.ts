import type { ReactNode } from "react";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export type JsonRowType = "object" | "array" | "primitive";

export interface JsonRow {
  id: string;
  keyName?: string;
  value: JsonValue;
  depth: number;
  type: JsonRowType;
  path: string;
  isExpandable: boolean;
}

export interface JsonTheme {
  backgroundColor?: string;
  textColor?: string;
  keyColor?: string;
  stringColor?: string;
  numberColor?: string;
  booleanColor?: string;
  nullColor?: string;
  iconColor?: string;
  fontSize?: number;
  rowPaddingVertical?: number;
  indentSize?: number;
}

export interface JsonRenderRowParams {
  row: JsonRow;
  isExpanded: boolean;
  toggle: () => void;
  theme: Required<JsonTheme>;
}

export interface JsonInspectorProps {
  data: JsonValue;
  defaultExpandedDepth?: number;
  theme?: "light" | "dark" | JsonTheme;
  renderRow?: (params: JsonRenderRowParams) => ReactNode;
}
