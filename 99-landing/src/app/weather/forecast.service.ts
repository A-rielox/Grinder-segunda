import { Injectable } from '@angular/core';
import {
   catchError,
   filter,
   map,
   mergeMap,
   Observable,
   of,
   share,
   switchMap,
   tap,
   throwError,
   toArray,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
   list: {
      dt_txt: string;
      main: {
         temp: number;
      };
   }[];
}

@Injectable({
   providedIn: 'root',
})
export class ForecastService {
   private url = 'https://api.openweathermap.org/data/2.5/forecast';

   constructor(
      private http: HttpClient,
      private notificationsService: NotificationsService
   ) {}

   getForecast() {
      return this.getCurrentLocation().pipe(
         map((coords) => {
            return new HttpParams()
               .set('lat', String(coords.latitude))
               .set('lon', String(coords.longitude))
               .set('units', 'metric')
               .set('appid', 'ca8b5facabb63bd9ace383475dbcabc4');
         }),
         switchMap((params) => {
            return this.http.get<OpenWeatherResponse>(this.url, { params });
         }),
         map((res) => res?.list),
         mergeMap((list) => of(...list)),
         filter((item, index) => index % 8 === 0),
         map((value) => {
            return { dateString: value.dt_txt, temp: value.main.temp };
         }),
         toArray(),
         share()
      );
   }

   getCurrentLocation() {
      return new Observable<GeolocationCoordinates>((observer) => {
         window.navigator.geolocation.getCurrentPosition(
            (position) => {
               observer.next(position.coords);
               observer.complete();
            },
            (err) => observer.error(err)
         );
      }).pipe(
         tap(() => {
            this.notificationsService.addSuccess('Got your Location.');
         }),
         catchError((err) => {
            this.notificationsService.addError('Could not get your Location.');

            return throwError(err);
         })
      );
   }
}
