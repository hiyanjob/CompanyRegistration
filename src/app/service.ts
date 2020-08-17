import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'; 

@Injectable({
    providedIn: 'root'
})
export class Service {

    constructor(private http: HttpClient) { }
    apiURL:string = '';
     //: Observable<any>
    uploadDatas(datas:any) {
        console.log('the sending datas ==> ',datas);
        // return this.http.post<any>(this.apiURL)
        //  .pipe(
        //   retry(2), // retry a failed request up to 2 times
        //   catchError(this.handleError)
        //  ); 
      }

      private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
          console.error('An error occurred:',   errorResponse.error.message);
        } 
       else {
          console.error(
            'Backend returned code ${errorResponse.status}, '+
            'body was: ${errorResponse.error}');
        }
        return throwError(
          'Error Occurred; please try again later.');
      };

}