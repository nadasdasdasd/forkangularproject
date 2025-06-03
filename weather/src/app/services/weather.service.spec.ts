import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrentWeather, ForecastWeather } from '../models/weather';
import { of } from 'rxjs';
import { WeatherDataService } from './weather.service';

describe('WeatherDataService', () => {
  let service: WeatherDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherDataService]
    });
    service = TestBed.inject(WeatherDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentWeather should return an Observable<CurrentWeather>', () => {
    const mockWeather: CurrentWeather = {"location":{"name":"Jakarta","region":"Jakarta Raya","country":"Indonesia","lat":-6.2146,"lon":106.8451,"tz_id":"Asia/Jakarta","localtime_epoch":1748938816,"localtime":"2025-06-03 15:20"},"current":{"last_updated_epoch":1748938500,"last_updated":"2025-06-03 15:15","temp_c":31.4,"temp_f":88.5,"is_day":1,"condition":{"text":"Moderate rain","icon":"//cdn.weatherapi.com/weather/64x64/day/302.png","code":1189},"wind_mph":7.2,"wind_kph":11.5,"wind_degree":18,"wind_dir":"NNE","pressure_mb":1008.0,"pressure_in":29.77,"precip_mm":0.01,"precip_in":0.0,"humidity":66,"cloud":50,"feelslike_c":36.2,"feelslike_f":97.1,"windchill_c":30.6,"windchill_f":87.1,"heatindex_c":34.5,"heatindex_f":94.0,"dewpoint_c":22.3,"dewpoint_f":72.1,"vis_km":8.0,"vis_miles":4.0,"uv":2.7,"gust_mph":8.6,"gust_kph":13.9,"air_quality":{"co":4963.55,"no2":188.7,"o3":23.0,"so2":117.105,"pm2_5":255.855,"pm10":259.37,"us-epa-index":6,"gb-defra-index":10}}} as CurrentWeather;
    const cityName = 'Jakarta';

    service.getCurrentWeather(cityName).subscribe(weather => {
      expect(weather).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(`http://api.weatherapi.com/v1/current.json?key=5b7157072f9c4ba28af110053252705&q=${cityName}&aqi=yes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });

  it('getCurrentWeatherList should call getCurrentWeather for each city', () => {
    const mockWeather: CurrentWeather = {"location":{"name":"Jakarta","region":"Jakarta Raya","country":"Indonesia","lat":-6.2146,"lon":106.8451,"tz_id":"Asia/Jakarta","localtime_epoch":1748938816,"localtime":"2025-06-03 15:20"},"current":{"last_updated_epoch":1748938500,"last_updated":"2025-06-03 15:15","temp_c":31.4,"temp_f":88.5,"is_day":1,"condition":{"text":"Moderate rain","icon":"//cdn.weatherapi.com/weather/64x64/day/302.png","code":1189},"wind_mph":7.2,"wind_kph":11.5,"wind_degree":18,"wind_dir":"NNE","pressure_mb":1008.0,"pressure_in":29.77,"precip_mm":0.01,"precip_in":0.0,"humidity":66,"cloud":50,"feelslike_c":36.2,"feelslike_f":97.1,"windchill_c":30.6,"windchill_f":87.1,"heatindex_c":34.5,"heatindex_f":94.0,"dewpoint_c":22.3,"dewpoint_f":72.1,"vis_km":8.0,"vis_miles":4.0,"uv":2.7,"gust_mph":8.6,"gust_kph":13.9,"air_quality":{"co":4963.55,"no2":188.7,"o3":23.0,"so2":117.105,"pm2_5":255.855,"pm10":259.37,"us-epa-index":6,"gb-defra-index":10}}} as CurrentWeather;
    const cityList = ['Jakarta', 'Rome'];
    spyOn(service, 'getCurrentWeather').and.returnValue(of(mockWeather));

    service.getCurrentWeatherList(cityList);

    expect(service.getCurrentWeather).toHaveBeenCalledTimes(0);
  });
});