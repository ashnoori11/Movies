import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheatersDTO } from "../movietheaters/movieTheater.model";

export interface movieDTO {
    id: number,
    title: string,
    poster: string,

    inTheaters: boolean;
    trailer: string;
    summery?: string;
    releaseDate: Date;
    genres: genreDTO[];
    movieTheaters: movieTheatersDTO[];
    actors: actorMovieDTO[];
}

export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
    summery?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genreIds?: number[];
    movieTheaterIds?: number[];
    actors?: actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDTO[];
    upCommingReleases?: movieDTO[];
}

export interface movieFormInformation {
    genres: genreDTO[];
    movieTheaters: movieTheatersDTO[];
}