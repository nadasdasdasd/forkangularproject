import {Injectable} from '@angular/core';
import {BehaviorSubject, concat, from, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { CurrentWeather, CurrentWeatherShow, ForecastWeather, ForecastWeatherShow } from '../models/weather';
import { concatMap, map } from 'rxjs/operators';
@Injectable()
export class WeatherDataService {
  private readonly CURRENT_URL = 'http://api.weatherapi.com/v1/current.json?key=5b7157072f9c4ba28af110053252705&q=Jakarta&aqi=yes';
  private readonly FORECAST_URL = 'http://api.weatherapi.com/v1/forecast.json?key=5b7157072f9c4ba28af110053252705&q=Jakarta&days=7&aqi=yes&alerts=no';

  last_id_current:number = 0;
  last_id_forecast:number = 0;

  dataChangeCurrentWeather: BehaviorSubject<CurrentWeatherShow[]> = new BehaviorSubject<CurrentWeatherShow[]>([]);
  dataChangeForecastWeather: BehaviorSubject<ForecastWeatherShow[]> = new BehaviorSubject<ForecastWeatherShow[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}

  get dataCurrentWeather(): CurrentWeatherShow[] {
    return this.dataChangeCurrentWeather.value;
  }

  get dataForecastWeather(): ForecastWeatherShow[] {
    return this.dataChangeForecastWeather.value;
  }

  getCurrentWeather(city_name: string): Observable<CurrentWeather> {
    return this.httpClient.get<CurrentWeather>(`http://api.weatherapi.com/v1/current.json?key=5b7157072f9c4ba28af110053252705&q=${city_name}&aqi=yes`);
  }

  getCurrentWeatherList(list_city: string[]): void {
    const getCurrentWeather: Observable<CurrentWeather>[] = [];
    list_city.forEach( x => {
      getCurrentWeather.push(this.httpClient.get<CurrentWeather>(`http://api.weatherapi.com/v1/current.json?key=5b7157072f9c4ba28af110053252705&q=${x}&aqi=yes`));
    });
    let show : CurrentWeatherShow[] = [];
    const final$ = of("completed");
    const getCurrentWeathers = from(getCurrentWeather).pipe(concatMap((observable) => observable));
    let i:number = 0;
    concat(getCurrentWeathers, final$).subscribe(response=>{
      
      //your existing code here
        if(response=="completed")
        {
          this.dataChangeCurrentWeather.next(show);
          console.log('all observables completed');
        }
        else
        {
          i++;
          this.last_id_current = i;
          show.push(new CurrentWeatherShow(i, <CurrentWeather>response));
        } 
      });
  }

  getForecastWeatherList(list_city: string[]): void {
    const getForecastWeather: Observable<ForecastWeather>[] = [];
    list_city.forEach( x => {
      getForecastWeather.push(this.httpClient.get<ForecastWeather>(`http://api.weatherapi.com/v1/forecast.json?key=5b7157072f9c4ba28af110053252705&q=${x}&days=8&aqi=yes&alerts=no`));
    });
    let show : ForecastWeatherShow[] = [];
    const final$ = of("completed");
    const getForecastWeathers = from(getForecastWeather).pipe(concatMap((observable) => observable));
    let i:number = 0;
    concat(getForecastWeathers, final$).subscribe(response=>{
      
      //your existing code here
        if(response=="completed")
        {
          this.dataChangeForecastWeather.next(show);
          console.log('all observables completed');
        }
        else
        {
          i++;
          this.last_id_forecast = i;
          show.push(new ForecastWeatherShow(i, <ForecastWeather>response));
        } 
      });
  }
  
}