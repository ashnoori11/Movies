import { actorMovieDTO } from "../actors/actors.model";

export interface movieDTO {
    id: number,
    title: string,
    poster: string,

}

export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
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