import React from "react";
import { View } from "react-native";
import JsonNode from "./JsonNode";

interface Props {
  data: any;
  defaultExpandedDepth?: number;
  theme?: "light" | "dark";
}

export default function JsonInspector({
  data,
  defaultExpandedDepth = 1,
  theme = "light",
}: Props) {
  return (
    <View>
      <JsonNode
        value={data}
        depth={0}
        maxDepth={defaultExpandedDepth}
        theme={theme}
      />
    </View>
  );
}
