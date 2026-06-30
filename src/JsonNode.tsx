import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function JsonNode({ value, depth, maxDepth }: any) {
  const [expanded, setExpanded] = useState(depth < maxDepth);

  if (typeof value !== "object" || value === null) {
    return (
      <Text style={{ color: "#333", fontSize: 14 }}>
        {JSON.stringify(value)}
      </Text>
    );
  }

  return (
    <View style={{ paddingLeft: depth * 12, marginVertical: 2 }}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={{ color: "#111", fontSize: 14 }}>
          {expanded ? "▼" : "▶"} {Array.isArray(value) ? "Array" : "Object"}
        </Text>
      </TouchableOpacity>

      {expanded &&
        Object.entries(value).map(([key, val]) => (
          <View key={key} style={{ marginVertical: 2 }}>
            <Text style={{ color: "#0066cc", fontSize: 14 }}>{key}:</Text>
            <JsonNode value={val} depth={depth + 1} maxDepth={maxDepth} />
          </View>
        ))}
    </View>
  );
}
