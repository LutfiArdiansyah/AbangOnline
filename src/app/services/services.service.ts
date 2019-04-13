import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getData(link: string): Observable<any> {
    return this.http.get<any>(this.config.api_url + link);
  }

  postData(link: string, data: any): Observable<any> {
    if (data) {
      return this.http.post<any>(this.config.api_url + link, data);
    }
  }
}
