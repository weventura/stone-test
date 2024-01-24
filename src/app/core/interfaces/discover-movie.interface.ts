export interface DiscoverResponse {
    page: number;
    results: Array<DiscoverMovie>;
    total_pages: number;
    total_results: number;
}

export interface DiscoverMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>,
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface QueryParams {
    include_adult: boolean;
    include_video: boolean;
    language: string;
    page:  number;
    sort_by: string;
}