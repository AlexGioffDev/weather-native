import { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Torino,IT"
        placeholderTextColor="#888"
        style={styles.input}
        returnKeyType="search"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={(e) => {
          if (input.trim()) {
            onSearch(input.trim());
            setInput("");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 140,
    paddingVertical: 5,
    borderRadius: 4,
    paddingHorizontal: 5,
    backgroundColor: "#F1FAEE",
    color: "#1D3557",
    fontFamily: Platform.select({
      android: "Inter_900Black",
      ios: "Inter-Black",
    }),
  },
});
