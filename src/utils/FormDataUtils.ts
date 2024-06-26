import { actorCreationDTO } from "../actors/actors.model";
import { movieCreationDTO } from "../movies/movies.model";


export function convertActorToFormData(actor: actorCreationDTO): FormData {

    const formData = new FormData();
    formData.append('name', actor.name);

    if (actor.biography) {
        formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth) {
        formData.append('dateOfBirth', formatDate(actor.dateOfBirth));
    }

    if (actor.picture) {

        formData.append('picture', actor.picture);
    }

    return formData;
}

export function convertMovieFormData(movie: movieCreationDTO) {
    const formData = new FormData();

    formData.append('title', movie.title);

    if (movie.summery) {
        formData.append('summery', movie.summery);
    }

    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));

    if (movie.releaseDate) {
        formData.append('releaseDate', formatDate(movie.releaseDate));
    }

    if (movie.poster) {
        formData.append('poster', movie.poster);
    }

    formData.append('genreIds', JSON.stringify(movie.genreIds));
    formData.append('movieTheaterIds', JSON.stringify(movie.movieTheaterIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
}

const formatDate = (date: Date): string => {
    const format = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}