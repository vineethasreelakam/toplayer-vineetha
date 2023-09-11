import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(
    private http: HttpClient
  ) { }

  public post(data: any, url: string): Observable<any> {
    return this.http.post<any>(url, data);
  }

  public PdfPost(data: any, url: string): Observable<any> {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.http.post<any>(url, data, requestOptions);
  }

  getAll(url: string, paramsVal?: any): Observable<any[]> {
    const options = { params: paramsVal };
    return this.http.get<any[]>(url, options );
  }

  getById(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
  public put(data: any, url: string): Observable<any> {
    return this.http.put<any>(url, data);
  }
  // put(id: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}/${id}`, value);
  // }
 
}


// all the methods like post, get are defined here