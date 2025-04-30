import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchBar from "./SearchBar";

export default function Header({
  title,
  onSearch,
}: {
  title: string;
  onSearch: (city: string) => void;
}) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Weather</Text>
        <SearchBar onSearch={onSearch} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontFamily: Platform.select({
      android: "Inter_900Black",
      ios: "Inter-Black",
    }),
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#F1FAEE",
  },
  right: {
    fontSize: 16,
    color: "gray",
  },
});
