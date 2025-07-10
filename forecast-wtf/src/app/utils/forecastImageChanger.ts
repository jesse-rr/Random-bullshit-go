interface WeatherImageMapType {
    codes: number[], image: string
}

const weatherImageMap: WeatherImageMapType[] = [
    // Clear/Sunny & Partly Cloudy
    { codes: [1000, 1003], image: "/desktop/sun.jpg" },
    // Cloudy & Overcast
    { codes: [1006, 1009], image: "/desktop/cloudy.jpg" },
    // Rain
    { codes: [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246], image: "/desktop/rain.jpg"},
    // Thunderstorms
    { codes: [1087, 1273, 1276, 1279, 1282], image: "/desktop/thunder.jpg" },
    // Snow/Ice
    { codes: [ 1066, 1114, 1117, 1210, 1213,  1216, 1219, 1222, 1225,  1237, 1255, 1258, 1261, 1264 ], image: "/desktop/snow.jpg" },
    // Fog/Mist
    { codes: [1030, 1135, 1147], image: "/desktop/fog.jpeg" },
    // Sleet/Freezing Rain
    { codes: [ 1069, 1072, 1168, 1171,  1198, 1201, 1204, 1207, 1249, 1252 ],image: "/desktop/sleet.jpg"}
];

export const ForecastImageChanger = (code: number, isDay: number): string => {
    for (const group of weatherImageMap) {
        if (group.codes.includes(code)) {
            return group.image;
        }
    }
    return '/desktop/night.jpg';
};