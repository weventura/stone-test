import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenresResponse } from '../../interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<GenresResponse> {
    return this.httpClient.get<GenresResponse>(`${environment.baseUrl}genre/movie/list`);
  }
}
