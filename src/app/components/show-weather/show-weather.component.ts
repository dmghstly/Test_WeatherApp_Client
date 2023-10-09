import {
  HttpClient
} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Month } from 'src/app/models/month.model';
import { WeatherForecast } from 'src/app/models/weather-forecast.model';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css']
})
export class ShowWeatherComponent implements OnInit {
  getMonths: Array<Month> = [];
  weatherForecast: Array<WeatherForecast> = [];
  baseApiUrl: string = 'https://localhost:7272';

  constructor(private readonly httpClient: HttpClient) {
  }

  // Initialization of show weather forecast page
  ngOnInit() {
    this.getMonths = [];

    var response = this.httpClient
      .get<Month[]>(this.baseApiUrl + '/GetMonths');

    response.subscribe({
      next: (months) => {
        this.getMonths = months;
        this.onSelected(months[0].id);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // This method is an action which start after selection of a month
  onSelected(monthId: string): void {
		this.weatherForecast = [];

    let response = this.httpClient
      .get<WeatherForecast[]>(this.baseApiUrl + '/GetWeatherForecast?monthId=' + monthId);

    response.subscribe({
      next: (forecast) => {
        this.weatherForecast = forecast;
      },
      error: (response) => {
        console.log(response);
      }
    });
	}
}
