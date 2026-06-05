# React Native JSON Inspector

A lightweight, customizable JSON viewer and inspector for React Native and Expo applications.

## Features

- JSON tree visualization
- Expand / collapse objects and arrays
- TypeScript support
- React Native compatible
- Expo compatible
- Customizable themes
- Lightweight and dependency-friendly

## Preview

![Preview](./assets/screenshot-1.jpeg)

## Installation

```bash
npm install react-native-json-inspector
```

or

```bash
yarn add react-native-json-inspector
```

## Usage

```tsx
import React from "react";
import { View } from "react-native";
import { JsonInspector } from "react-native-json-inspector";

const data = {
  user: {
    name: "John Doe",
    age: 28,
    active: true,
  },
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <JsonInspector data={data} defaultExpandedDepth={2} theme="light" />
    </View>
  );
}
```

## Props

| Prop                 | Type    | Default  | Description            |
| -------------------- | ------- | -------- | ---------------------- | ---------- |
| data                 | any     | required | JSON data to display   |
| defaultExpandedDepth | number  | 1        | Initial expanded depth |
| theme                | "light" | "dark"   | light                  | Theme mode |

## Roadmap

### v0.1

- JSON tree viewer
- Expand / collapse nodes
- Theme support
- TypeScript support

### v0.2

- Search functionality
- Copy value
- Copy JSON path
- Better styling

### v0.3

- Virtualized rendering
- Large JSON support
- Custom renderers

## Contributing

Contributions, issues, and feature requests are welcome.

## License

MIT License
