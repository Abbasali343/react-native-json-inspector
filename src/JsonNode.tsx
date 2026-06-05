import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function JsonNode({ value, depth, maxDepth }: any) {
  const [expanded, setExpanded] = useState(depth < maxDepth);

  if (typeof value !== "object" || value === null) {
    return <Text>{JSON.stringify(value)}</Text>;
  }

  return (
    <View
      style={{
        paddingLeft: depth * 12,
      }}
    >
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text>{expanded ? "▼" : "▶"}</Text>
      </TouchableOpacity>

      {expanded &&
        Object.entries(value).map(([key, val]) => (
          <View key={key}>
            <Text>{key}:</Text>

            <JsonNode value={val} depth={depth + 1} maxDepth={maxDepth} />
          </View>
        ))}
    </View>
  );
}
