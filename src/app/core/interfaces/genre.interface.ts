export interface Genre {
    id: number;
    name: string;
    enable?: boolean;
}

export interface GenresResponse {
    genres: Array<Genre>;
}