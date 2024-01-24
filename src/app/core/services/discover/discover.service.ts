import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscoverResponse, QueryParams } from '../../interfaces/discover-movie.interface';
import { MovieDetail } from '../../interfaces/movie-detail.interface';
import { VideoResponse } from '../../interfaces/11video.interface';
import { ReviewResponse } from '../../interfaces/review.interface';
import { SimilarResponse } from '../../interfaces/similar.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  constructor(private httpClient: HttpClient) {}

  getMovies(params: QueryParams): Observable<DiscoverResponse> {
    return this.httpClient.get<DiscoverResponse>(
      `${environment.baseUrl}discover/movie?include_adult=${params.include_adult}&include_video=${params.include_video}&language=${params.language}&page=${params.page}&sort_by=${params.sort_by}`
    );
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    return this.httpClient.get<MovieDetail>(
      `${environment.baseUrl}movie/${id}`
    );
  }

  getVideosByMovie(id: number): Observable<VideoResponse> {
    return this.httpClient.get<VideoResponse>(
      `${environment.baseUrl}movie/${id}/videos?language=en-US`
    );
  }

  getSimilarByMovie(id: number): Observable<SimilarResponse> {
    return this.httpClient.get<SimilarResponse>(
      `${environment.baseUrl}movie/${id}/similar`
    );
  }

  getReviews(id: number): Observable<ReviewResponse> {
    return this.httpClient.get<ReviewResponse>(
      `${environment.baseUrl}movie/${id}/reviews`
    );
    
  }
}
