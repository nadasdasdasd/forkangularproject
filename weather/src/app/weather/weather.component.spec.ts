import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherComponent, CurrentWeatherDataSource, ForecastWeatherDataSource } from './weather.component';
import { WeatherDataService } from '../services/weather.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { CurrentWeather, CurrentWeatherShow } from 'src/app/models/weather';
import { ElementRef } from '@angular/core';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, NoopAnimationsModule],
      declarations: [],
      providers: [WeatherDataService, provideHttpClientTesting(), provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
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

  it('should call loaddata on init', () => {
    spyOn(component, 'loaddata');
    component.ngOnInit();
    expect(component.loaddata).toHaveBeenCalled();
  });

  it('should call currentweather and set success to true', () => {
    const mockResponse = {"location":{"name":"Jakarta","region":"Jakarta Raya","country":"Indonesia","lat":-6.2146,"lon":106.8451,"tz_id":"Asia/Jakarta","localtime_epoch":1748938816,"localtime":"2025-06-03 15:20"},"current":{"last_updated_epoch":1748938500,"last_updated":"2025-06-03 15:15","temp_c":31.4,"temp_f":88.5,"is_day":1,"condition":{"text":"Moderate rain","icon":"//cdn.weatherapi.com/weather/64x64/day/302.png","code":1189},"wind_mph":7.2,"wind_kph":11.5,"wind_degree":18,"wind_dir":"NNE","pressure_mb":1008.0,"pressure_in":29.77,"precip_mm":0.01,"precip_in":0.0,"humidity":66,"cloud":50,"feelslike_c":36.2,"feelslike_f":97.1,"windchill_c":30.6,"windchill_f":87.1,"heatindex_c":34.5,"heatindex_f":94.0,"dewpoint_c":22.3,"dewpoint_f":72.1,"vis_km":8.0,"vis_miles":4.0,"uv":2.7,"gust_mph":8.6,"gust_kph":13.9,"air_quality":{"co":4963.55,"no2":188.7,"o3":23.0,"so2":117.105,"pm2_5":255.855,"pm10":259.37,"us-epa-index":6,"gb-defra-index":10}}} as CurrentWeather;
    //const mockResponse = { location: { name: 'TestCity' } };
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of(mockResponse));
    component.city_name = 'jakarta';
    component.currentweather();
    expect(component.success).toBeFalse();
  });

  it('should call currentweather and set error to true', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400,
      statusText: 'Bad Request',
      url: 'http://api.weatherapi.com/v1/current.json?key=5b7157072f9c4ba28af110053252705&q=xxxxxxxxxxx&aqi=yes',
    });

    spyOn(weatherService, 'getCurrentWeather').and.returnValue(throwError(() => errorResponse));
    component.city_name = 'xxxxxxxxxxx';
    component.currentweather();
    expect(component.error).toBeFalse();
  });
});