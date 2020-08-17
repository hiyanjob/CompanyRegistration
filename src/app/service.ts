import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }
  apiImageURL: string = 'http://34.231.199.190:8000/Imageupload';
  headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdGlkQGdtYWlsLmNvbSJ9LCJpYXQiOjE1OTc0OTE2MTR9.INImqePtMRqiYPGhXPuNN_FRZPEaWpZTDa4yRZtvo0c'
  });
  options = { headers: this.headers };

  uploadImages(files: any): Observable<any> {
    console.log('the sending datas ==> ', files);
    return this.http.post<any>(this.apiImageURL, files, {
      ...this.options,
      // reportProgress: true,
      // observe: 'events'
    }).pipe(retry(2), catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('An error occurred:', errorResponse.error.message);
    }
    else {
      console.error(
        `'Backend returned code ${errorResponse.status}, ' +
        'body was: ${errorResponse.error}'`);
    }
    return throwError(
      'Error Occurred; please try again later.');
  };

}