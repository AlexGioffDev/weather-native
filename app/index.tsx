// app/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import { getCurrentWeather } from "@/service/weatherService";
import FontAwesomeSix from "@expo/vector-icons/FontAwesome6";
import FontAwesomeFive from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState<string>("Rome, IT");

  useEffect(() => {
    getCurrentWeather(city)
      .then((d) => {
        setWeather(d);
      })
      .finally(() => setLoading(false));
  }, [city]);

  function getAirQualityLevel(index: number) {
    switch (index) {
      case 1:
        return { label: "Good", color: "#4CAF50" }; // green
      case 2:
        return { label: "Moderate", color: "#FFEB3B" }; // yellow
      case 3:
        return { label: "Unhealthy (Sensitive)", color: "#FF9800" }; // orange
      case 4:
        return { label: "Unhealthy", color: "#F44336" }; // red
      case 5:
        return { label: "Very Unhealthy", color: "#9C27B0" }; // purple
      case 6:
        return { label: "Hazardous", color: "#6D4C41" }; // brown
      default:
        return { label: "Unknown", color: "#9E9E9E" }; // grey
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Weather" onSearch={(newCity) => setCity(newCity)} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : weather ? (
          <View style={{ gap: 20 }}>
            <View style={styles.groupInfo}>
              <View style={styles.temps}>
                <Text style={styles.temp}>
                  <FontAwesomeSix
                    name="temperature-half"
                    size={42}
                    color="#F1FAEE"
                  />{" "}
                  {weather.current.temp_c}°C
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#F1FAEE",
                  }}
                >
                  Feels Like: {weather.current.feelslike_c}°C
                </Text>
              </View>
              <Image
                source={{ uri: `https:${weather.current.condition.icon}` }}
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
            </View>
            <View style={styles.groupNames}>
              <Text style={styles.city}>
                {weather.location.name}, {weather.location.country}
              </Text>

              <Text style={{ color: "#F1FAEE", fontSize: 18 }}>
                {weather.current.condition.text}
              </Text>
            </View>
            <View style={styles.groupOther}>
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <FontAwesomeFive name="tint" size="32" color="#F1FAEE" />
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#F1FAEE",
                    }}
                  >
                    Humidity
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#F1FAEE",
                  }}
                >
                  {weather.current.humidity}%
                </Text>
              </View>
              {(() => {
                const air = getAirQualityLevel(
                  weather.current.air_quality["us-epa-index"]
                );
                return (
                  <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                      <FontAwesome name="circle" size={32} color={air.color} />
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#F1FAEE",
                        }}
                      >
                        Air Quality
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "#F1FaEE",
                      }}
                    >
                      {air.label}
                    </Text>
                  </View>
                );
              })()}
            </View>
          </View>
        ) : (
          <Text>Error loading weather</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#457B9D",
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  groupInfo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#F1FAEE",
  },
  temps: {
    columnGap: 0,
  },
  groupNames: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  city: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F1FAEE",
  },
  groupOther: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
