export class CurrentWeatherShow {
    constructor(id: number, currentweather: CurrentWeather)
    {
        this.id = id;
        this.name = currentweather.location.name;
        this.temperature = currentweather.current.temp_c;
        this.weather_condition = currentweather.current.condition.text;
        this.icon = currentweather.current.condition.icon;
    }
    id: number
    name: string
    temperature: number
    weather_condition: string
    icon:string
}

export class ForecastWeatherShow {
    constructor(id: number, forecastweather: ForecastWeather)
    {
        this.id = id;
        this.name = forecastweather.location.name;
        this.temperature_1 = forecastweather.forecast.forecastday[1].day.avgtemp_c;
        this.icon_1 = forecastweather.forecast.forecastday[1].day.condition.icon;
        this.weather_condition_1 = forecastweather.forecast.forecastday[1].day.condition.text;
        this.temperature_2 = forecastweather.forecast.forecastday[2].day.avgtemp_c;
        this.weather_condition_2 = forecastweather.forecast.forecastday[2].day.condition.text;
        this.icon_2 = forecastweather.forecast.forecastday[2].day.condition.icon;
        // this.temperature_3 = forecastweather.forecast.forecastday[3].day.avgtemp_c;
        // this.weather_condition_3 = forecastweather.forecast.forecastday[3].day.condition.text;
        // this.icon_3 = forecastweather.forecast.forecastday[3].day.condition.icon;
        // this.temperature_4 = forecastweather.forecast.forecastday[4].day.avgtemp_c;
        // this.weather_condition_4 = forecastweather.forecast.forecastday[4].day.condition.text;
        // this.icon_4 = forecastweather.forecast.forecastday[4].day.condition.icon;
        // this.temperature_5 = forecastweather.forecast.forecastday[5].day.avgtemp_c;
        // this.weather_condition_5 = forecastweather.forecast.forecastday[5].day.condition.text;
        // this.icon_5 = forecastweather.forecast.forecastday[5].day.condition.icon;
        // this.temperature_6 = forecastweather.forecast.forecastday[6].day.avgtemp_c;
        // this.weather_condition_6 = forecastweather.forecast.forecastday[6].day.condition.text;
        // this.icon_6 = forecastweather.forecast.forecastday[6].day.condition.icon;
        // this.temperature_7 = forecastweather.forecast.forecastday[7].day.avgtemp_c;
        // this.weather_condition_7 = forecastweather.forecast.forecastday[7].day.condition.text;
        // this.icon_7 = forecastweather.forecast.forecastday[7].day.condition.icon;
    }
    id: number
    name: string
    temperature_1: number
    weather_condition_1: string
    icon_1:string
    temperature_2: number
    weather_condition_2: string
    icon_2:string
    // temperature_3: number
    // weather_condition_3: string
    // icon_3:string
    // temperature_4: number
    // weather_condition_4: string
    // icon_4:string
    // temperature_5: number
    // weather_condition_5: string
    // icon_5:string
    // temperature_6: number
    // weather_condition_6: string
    // icon_6:string
    // temperature_7: number
    // weather_condition_7: string
    // icon_7:string
}

export interface CurrentWeather {
  location: Location
  current: Current
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  air_quality: AirQuality
}

export interface Condition {
  text: string
  icon: string
  code: number
}

export interface AirQuality {
  co: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  "us-epa-index": number
  "gb-defra-index": number
}


export interface ForecastWeather {
  location: Location
  current: Current
  forecast: Forecast
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  air_quality: AirQuality
}

export interface Forecast {
  forecastday: Forecastday[]
}

export interface Forecastday {
  date: string
  date_epoch: number
  day: Day
  astro: Astro
  hour: Hour[]
}

export interface Day {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: Condition
  uv: number
  air_quality: AirQuality
}

export interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: number
  is_moon_up: number
  is_sun_up: number
}

export interface Hour {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
  air_quality: AirQuality
}

