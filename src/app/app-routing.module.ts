import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadWeatherComponent } from './components/upload-weather/upload-weather.component';
import { ShowWeatherComponent } from './components/show-weather/show-weather.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'upload_weather_data',
    component: UploadWeatherComponent
  },
  {
    path: 'show_weather_data',
    component: ShowWeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
