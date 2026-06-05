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

export interface JsonInspectorProps {
  data: JsonValue;
  defaultExpandedDepth?: number;
  theme?: "light" | "dark";
}
