import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { WeatherDataService } from '../services/weather.service';
import { CurrentWeatherShow, ForecastWeatherShow } from 'src/app/models/weather';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // If using matInput directive
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,
  MatTableModule,
  MatFormFieldModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  FormsModule,
  MatIconModule,
  MatButtonModule],
  providers:[ WeatherDataService],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  displayedColumnsCurrent = ['id', 'name', 'temperature', 'weather_condition','actions'];
  displayedColumnsForecast = ['id', 'name', 'temperature_1', 'weather_condition_1','temperature_2', 'weather_condition_2'];
  exampleDatabase!: WeatherDataService | null;
  dataSourceCurrent!: CurrentWeatherDataSource | null;
  dataSourceForecast!: ForecastWeatherDataSource | null;
  error: boolean = false;
  success: boolean = false;
  city_name!: string;
  city_list: string[] = [];
  current_date: Date = new Date();
  loading = false;
  constructor(public httpClient: HttpClient,
      public dataService: WeatherDataService) { }
    
    @ViewChild(MatPaginator, { static: true })
  paginatorcurrent!: MatPaginator;
    @ViewChild(MatSort, { static: true })
  sortcurrent!: MatSort;
    @ViewChild('filtercurrent', { static: true })
  filtercurrent!: ElementRef;

    @ViewChild(MatPaginator, { static: true })
  paginatorforecast!: MatPaginator;
    @ViewChild(MatSort, { static: true })
  sortforecast!: MatSort;
    @ViewChild('filterforecast', { static: true })
  filterforecast!: ElementRef;
     addDays(date: Date, days: number): string {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString();
  }
  ngOnInit(): void {
    if(!(localStorage.getItem('city_list') === null)) this.city_list = JSON.parse(localStorage.getItem('city_list') || '{}');
    this.loaddata();
  }
  loaddata(){
    this.exampleDatabase = new WeatherDataService(this.httpClient);
    this.dataSourceCurrent = new CurrentWeatherDataSource(this.exampleDatabase, this.paginatorcurrent, this.sortcurrent, this.city_list);
    fromEvent(this.filtercurrent.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceCurrent) {
          return;
        }
        this.dataSourceCurrent.filter = this.filtercurrent.nativeElement.value;
      });
    this.dataSourceForecast = new ForecastWeatherDataSource(this.exampleDatabase, this.paginatorforecast, this.sortforecast, this.city_list);
    fromEvent(this.filterforecast.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceForecast) {
          return;
        }
        this.dataSourceForecast.filter = this.filterforecast.nativeElement.value;
      });
  }

  delete(row: CurrentWeatherShow){
    this.city_list.splice(this.city_list.indexOf(row.name), 1);
    localStorage.setItem('city_list', JSON.stringify(this.city_list));
    this.loaddata();
  }

  currentweather(){
    console.log(this.city_name);
    this.loading = true;
    this.dataService.getCurrentWeather(this.city_name).subscribe(x => {
      
        this.success = true;
        this.error = false;
        this.city_list.push(x.location.name);
        localStorage.setItem('city_list', JSON.stringify(this.city_list));
        this.loaddata();
        this.loading = false;
    },
          (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
          this.error = true;
        this.success = false;
        this.loading = false;
          }
        );
  }
}

export class CurrentWeatherDataSource extends DataSource<CurrentWeatherShow> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: CurrentWeatherShow[] = [];
  renderedData: CurrentWeatherShow[] = [];

  constructor(public _exampleDatabase: WeatherDataService,public _paginator: MatPaginator,public _sort: MatSort, public list_city: string[]) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CurrentWeatherShow[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeCurrentWeather,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getCurrentWeatherList(this.list_city);


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.dataCurrentWeather.slice().filter((currentWeatherShow: CurrentWeatherShow) => {
          const searchStr = (currentWeatherShow.id+ currentWeatherShow.name+currentWeatherShow.temperature+currentWeatherShow.weather_condition).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: CurrentWeatherShow[]): CurrentWeatherShow[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'temperature': [propertyA, propertyB] = [a.temperature, b.temperature]; break;
        case 'weather_condition': [propertyA, propertyB] = [a.weather_condition, b.weather_condition]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

export class ForecastWeatherDataSource extends DataSource<ForecastWeatherShow> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ForecastWeatherShow[] = [];
  renderedData: ForecastWeatherShow[] = [];

  constructor(public _exampleDatabase: WeatherDataService,
              public _paginator: MatPaginator,
              public _sort: MatSort, public list_city: string[]) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ForecastWeatherShow[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeForecastWeather,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getForecastWeatherList(this.list_city);


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.dataForecastWeather.slice().filter((forecastWeatherShow: ForecastWeatherShow) => {
          const searchStr = (forecastWeatherShow.id+ forecastWeatherShow.name+forecastWeatherShow.temperature_1+forecastWeatherShow.weather_condition_1+forecastWeatherShow.temperature_2+forecastWeatherShow.weather_condition_2).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: ForecastWeatherShow[]): ForecastWeatherShow[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'temperature_1': [propertyA, propertyB] = [a.temperature_1, b.temperature_1]; break;
        case 'weather_condition_1': [propertyA, propertyB] = [a.weather_condition_1, b.weather_condition_1]; break;
        case 'temperature_2': [propertyA, propertyB] = [a.temperature_2, b.temperature_2]; break;
        case 'weather_condition_2': [propertyA, propertyB] = [a.weather_condition_2, b.weather_condition_2]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
