const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getCurrentWeather(city: string) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Weater API ERROR: ", error);
    return error;
  }
}
