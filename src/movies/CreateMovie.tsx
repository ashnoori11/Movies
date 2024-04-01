import MovieForm from "./MovieForm";
import * as Yup from 'yup';
import { genreDTO } from '../genres/genres.model';
import { movieCreationDTO } from './movies.model';
import { movieTheatersDTO } from '../movietheaters/movieTheater.model';

export default function CreateMovie() {

    const theModel: movieCreationDTO = {
        title: '',
        inTheaters: false,
        trailer: '',
        releaseDate: new Date(),
        poster: undefined,
        posterURL: undefined
    }

    const nonSelectedGenres: genreDTO[] =
        [{ id: 1, name: 'Comedy' }, { id: 2, name: 'Drama' }, { id: 3, name: 'action' }]

    const nonSelectedMovieTheaters: movieTheatersDTO[] =
        [{ id: 1, name: 'somePlaceOne' }, { id: 2, name: 'somePlaceTwo' }, { id: 3, name: 'somePlaceThree' }]

    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm
                model={{ ...theModel }}
                onSubmit={async (values, actions) => {

                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('this field is required')
                        .firstLetterUppercase()
                    //     ,
                    // poster: Yup.mixed().test(
                    //     "required",
                    //     "Please select a file",
                    //     (files: FileList) => files?.length > 0)
                })}
                selectedGenres={[]}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheaters={[]}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
            />
        </>
    );
}