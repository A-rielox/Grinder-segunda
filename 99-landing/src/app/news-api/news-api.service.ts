import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';

export interface Article {
   title: string;
   // description: string;
   url: string;
   source: {
      name: string;
   };
}

interface NewsApiResponse {
   totalResults: number;
   articles: Article[];
}

@Injectable({
   providedIn: 'root',
})
export class NewsApiService {
   private url = 'https://newsapi.org/v2/top-headlines';
   private pageSize = 10;
   private apiKey = 'b0639f0fe8874a6ab39e256f4dec5d18';
   private country = 'mx';

   private pagesInput: Subject<number>; // num de la pag q quiero
   pagesOutput: Observable<Article[]>; // lista de articulos
   numberOfPages: Subject<number>; // p' mis nums de paginacion

   constructor(private http: HttpClient) {
      this.pagesInput = new Subject();
      this.numberOfPages = new Subject();

      this.pagesOutput = this.pagesInput.pipe(
         map((page) => {
            return new HttpParams()
               .set('apiKey', this.apiKey)
               .set('country', this.country)
               .set('pageSize', String(this.pageSize))
               .set('page', String(page));
         }),
         switchMap((params) => {
            return this.http.get<NewsApiResponse>(this.url, { params });
         }),
         tap((res) => {
            console.log(res);
            const totalPages = Math.ceil(res.totalResults / this.pageSize);

            this.numberOfPages.next(totalPages);
         }),
         map((res) => res?.articles)
      );
   }

   getPage(page: number) {
      this.pagesInput.next(page);
   }
}
