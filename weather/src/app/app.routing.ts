import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CurrentweatherComponent } from './currentweather/currentweather.component';

const routes: Routes = [
    { path: '', component: CurrentweatherComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);