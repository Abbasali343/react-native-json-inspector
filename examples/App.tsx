import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { JsonInspector } from "../src";

const data = {
  user: {
    name: "Faizan",
    age: 28,
    active: true,
  },
};

export default function App() {
  return (
    <SafeAreaView>
      <JsonInspector data={data} defaultExpandedDepth={2} />
    </SafeAreaView>
  );
}
