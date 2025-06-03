import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { appRoutingModule } from './app.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertComponent } from './alert/alert.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NativeDateAdapter} from '@angular/material/core';
import { APP_BASE_HREF } from '@angular/common';
import { CurrentweatherComponent } from './currentweather/currentweather.component';
import { WeatherDataService } from './services/weather.service';
import { AlertService } from './services/alert.service';
import { MatSelectModule } from '@angular/material/select';

export function baseHrefFactory()
{
  let expectedBaseHref = '/eniprocurement';
  let currentBaseHref = window.location.pathname.substr(0, expectedBaseHref.length);
  //Add checks herre if needed
  return currentBaseHref;
}

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        CurrentweatherComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        appRoutingModule,
        MatNativeDateModule, 
        MatDatepickerModule,
        MatGridListModule,
        MatCheckboxModule
    ],
    providers: [
        AlertService,
        NativeDateAdapter,
        WeatherDataService,
        {provide: APP_BASE_HREF, useValue: '/weather'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
