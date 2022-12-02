import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanLoad {
   constructor(private authService: AuthService, private router: Router) {}

   // return true --> p'q SI se pueda visitar o cargar la ruta ( false p'q NO )
   canLoad(
      route: Route,
      segments: UrlSegment[]
   ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.signedin$.pipe(
         skipWhile((val) => val === null),
         take(1),
         tap((authenticated) => {
            // console.log(authenticated); true

            if (!authenticated) {
               this.router.navigateByUrl('/');
            }
         })
      );
   }
}

// si se le pasa un Observable => canLoad va a esperar a q se marque como "complete" para revisar su valor.
// se se le pasa un observable => se necesita q se complete para tomar su valor
// take() "marca" como completo el observable ( no lo marca, pero hace creer al subscriber que si ), lo marca como completo despues de tomar la cantidad de valores especificados
