import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrentweatherComponent, CurrentWeatherDataSource, ForecastWeatherDataSource } from './currentweather.component';
import { WeatherDataService } from '../services/weather.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { CurrentWeather, CurrentWeatherShow, ForecastWeatherShow } from '../models/weather';
import { ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CurrentweatherComponent', () => {
  let component: CurrentweatherComponent;
  let fixture: ComponentFixture<CurrentweatherComponent>;
  let weatherService: WeatherDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentweatherComponent ],
      imports: [ HttpClientTestingModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule ],
      providers: [ WeatherDataService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentweatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load city list from localStorage on init', () => {
    localStorage.setItem('city_list', JSON.stringify(['London', 'Paris']));
    component.ngOnInit();
    expect(component.city_list).toEqual(['London', 'Paris']);
  });

  it('should call getCurrentWeather and update city_list on success', () => {
    const mockWeather = {"location":{"name":"Jakarta","region":"Jakarta Raya","country":"Indonesia","lat":-6.2146,"lon":106.8451,"tz_id":"Asia/Jakarta","localtime_epoch":1748938816,"localtime":"2025-06-03 15:20"},"current":{"last_updated_epoch":1748938500,"last_updated":"2025-06-03 15:15","temp_c":31.4,"temp_f":88.5,"is_day":1,"condition":{"text":"Moderate rain","icon":"//cdn.weatherapi.com/weather/64x64/day/302.png","code":1189},"wind_mph":7.2,"wind_kph":11.5,"wind_degree":18,"wind_dir":"NNE","pressure_mb":1008.0,"pressure_in":29.77,"precip_mm":0.01,"precip_in":0.0,"humidity":66,"cloud":50,"feelslike_c":36.2,"feelslike_f":97.1,"windchill_c":30.6,"windchill_f":87.1,"heatindex_c":34.5,"heatindex_f":94.0,"dewpoint_c":22.3,"dewpoint_f":72.1,"vis_km":8.0,"vis_miles":4.0,"uv":2.7,"gust_mph":8.6,"gust_kph":13.9,"air_quality":{"co":4963.55,"no2":188.7,"o3":23.0,"so2":117.105,"pm2_5":255.855,"pm10":259.37,"us-epa-index":6,"gb-defra-index":10}}} as CurrentWeather;
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of(mockWeather));
    spyOn(component, 'loaddata');

    component.city_name = 'Jakarta';
    component.currentweather();

    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('Jakarta');
    expect(component.success).toBe(true);
    expect(component.error).toBe(false);
    expect(component.city_list).toContain('Jakarta');
    expect(localStorage.getItem('city_list')).toEqual(JSON.stringify(['London', 'Paris', 'Jakarta', 'Jakarta', 'Jakarta', 'Jakarta', 'Jakarta', 'Jakarta','Jakarta', 'Jakarta','Jakarta', 'Jakarta','Jakarta']));
    expect(component.loaddata).toHaveBeenCalled();
  });

  it('should handle getCurrentWeather error', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(throwError({ name: 'Error', message: 'Test Error' }));

    component.city_name = 'TestCity';
    component.currentweather();

    expect(component.error).toBe(true);
    expect(component.success).toBe(false);
  });
});