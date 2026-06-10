import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { flattenJson } from "./flattenJson";
import { JsonInspectorProps, JsonRow, JsonTheme } from "./types";

const lightTheme: Required<JsonTheme> = {
  backgroundColor: "#ffffff",
  textColor: "#111827",
  keyColor: "#2563eb",
  stringColor: "#15803d",
  numberColor: "#9333ea",
  booleanColor: "#ea580c",
  nullColor: "#6b7280",
  iconColor: "#374151",
  fontSize: 14,
  rowPaddingVertical: 4,
  indentSize: 16,
};

const darkTheme: Required<JsonTheme> = {
  backgroundColor: "#111827",
  textColor: "#f9fafb",
  keyColor: "#93c5fd",
  stringColor: "#86efac",
  numberColor: "#d8b4fe",
  booleanColor: "#fdba74",
  nullColor: "#9ca3af",
  iconColor: "#d1d5db",
  fontSize: 14,
  rowPaddingVertical: 4,
  indentSize: 16,
};

function resolveTheme(theme: JsonInspectorProps["theme"]): Required<JsonTheme> {
  if (theme === "dark") {
    return darkTheme;
  }

  if (theme === "light" || theme === undefined) {
    return lightTheme;
  }

  return {
    ...lightTheme,
    ...theme,
  };
}

function getValueLabel(row: JsonRow): string {
  if (row.type === "array") {
    return `Array [${Array.isArray(row.value) ? row.value.length : 0}]`;
  }

  if (row.type === "object") {
    return `Object {${
      typeof row.value === "object" &&
      row.value !== null &&
      !Array.isArray(row.value)
        ? Object.keys(row.value).length
        : 0
    }}`;
  }

  return JSON.stringify(row.value);
}

function getPrimitiveColor(row: JsonRow, theme: Required<JsonTheme>) {
  if (row.value === null) {
    return theme.nullColor;
  }

  if (typeof row.value === "string") {
    return theme.stringColor;
  }

  if (typeof row.value === "number") {
    return theme.numberColor;
  }

  if (typeof row.value === "boolean") {
    return theme.booleanColor;
  }

  return theme.textColor;
}

export default function JsonInspector({
  data,
  defaultExpandedDepth = 1,
  theme = "light",
  renderRow,
}: JsonInspectorProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());

  const activeTheme = useMemo(() => resolveTheme(theme), [theme]);

  const rows = useMemo(() => {
    return flattenJson(data, defaultExpandedDepth, expandedPaths, collapsedPaths);
  }, [data, defaultExpandedDepth, expandedPaths, collapsedPaths]);

  const isPathExpanded = (row: JsonRow) => {
    if (!row.isExpandable) {
      return false;
    }

    if (collapsedPaths.has(row.path)) {
      return false;
    }

    return row.depth < defaultExpandedDepth || expandedPaths.has(row.path);
  };

  const togglePath = (row: JsonRow) => {
    setExpandedPaths((prevExpanded) => {
      const nextExpanded = new Set(prevExpanded);

      setCollapsedPaths((prevCollapsed) => {
        const nextCollapsed = new Set(prevCollapsed);
        const currentlyExpanded = isPathExpanded(row);

        if (currentlyExpanded) {
          nextExpanded.delete(row.path);
          nextCollapsed.add(row.path);
        } else {
          nextCollapsed.delete(row.path);
          nextExpanded.add(row.path);
        }

        return nextCollapsed;
      });

      return nextExpanded;
    });
  };

  const renderDefaultRow = (item: JsonRow, isExpanded: boolean) => {
    const valueColor =
      item.type === "primitive"
        ? getPrimitiveColor(item, activeTheme)
        : activeTheme.textColor;

    return (
      <Text
        style={{
          color: activeTheme.textColor,
          fontSize: activeTheme.fontSize,
          lineHeight: activeTheme.fontSize + 8,
        }}
      >
        <Text style={{ color: activeTheme.iconColor }}>
          {item.isExpandable ? (isExpanded ? "▼ " : "▶ ") : "  "}
        </Text>

        {item.keyName ? (
          <Text style={{ color: activeTheme.keyColor, fontWeight: "600" }}>
            {item.keyName}:{" "}
          </Text>
        ) : null}

        <Text style={{ color: valueColor }}>{getValueLabel(item)}</Text>
      </Text>
    );
  };

  const renderItem = ({ item }: { item: JsonRow }) => {
    const isExpanded = isPathExpanded(item);

    return (
      <View
        style={{
          paddingLeft: item.depth * activeTheme.indentSize,
          paddingVertical: activeTheme.rowPaddingVertical,
          paddingRight: 12,
          backgroundColor: activeTheme.backgroundColor,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!item.isExpandable}
          onPress={() => togglePath(item)}
        >
          {renderRow
            ? renderRow({
                row: item,
                isExpanded,
                toggle: () => togglePath(item),
                theme: activeTheme,
              })
            : renderDefaultRow(item, isExpanded)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={40}
      maxToRenderPerBatch={40}
      windowSize={10}
      style={{ backgroundColor: activeTheme.backgroundColor }}
      contentContainerStyle={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: activeTheme.backgroundColor,
      }}
    />
  );
}
