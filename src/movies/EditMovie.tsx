import { useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import * as Yup from 'yup';
import { genreDTO } from '../genres/genres.model';
import { movieCreationDTO } from './movies.model';
import { movieTheatersDTO } from '../movietheaters/movieTheater.model';
import { actorMovieDTO } from '../actors/actors.model';

export default function EditMovie() {

    const { id }: any = useParams();
    const theModel: movieCreationDTO = {
        title: 'Toy Story',
        inTheaters: false,
        trailer: 'Andy s favourite toy, Woody, is worried that after Andy receives his birthday gift, a new toy called Buzz Lightyear, his importance may get reduced.He thus hatches a plan to eliminate Buzz.',
        releaseDate: new Date('1995-02-22'),
        poster: undefined,
        posterURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Toy_Story.jpg/220px-Toy_Story.jpg'
    }

    const nonSelectedGenre: genreDTO[] = [{ id: 1, name: 'Comedy' }, { id: 2, name: 'Drama' }];
    const selectedGenre: genreDTO[] = [{ id: 3, name: 'action' }];

    const nonSelectedMovieTheaters: movieTheatersDTO[] = [{ id: 1, name: 'SomeWhereOne' }, { id: 2, name: 'SomeWhereTwo' }];
    const selectedMovieTheaters: movieTheatersDTO[] = [{ id: 3, name: 'SomeWhereThree' }];

    const selectedActors: actorMovieDTO[] = [
        { id: 3, name: 'Eiza González', charcter: 'Auggie Salazar', picture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Feiza-gonzalez-variety-latino-portraits-2018_a2ZuZmqUmZqaraWkpJRoZmlurWZsa2s.jpg&f=1&nofb=1&ipt=2103f9c40ad8adf9670d2827548a73885339afe8850846bdd4947b69d0324cea&ipo=images' }
    ];

    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm
                model={{ ...theModel }}
                onSubmit={async (values, actions) => {

                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                    console.log(`the id is ${id}`);
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
                dateStringFormat={'en-CA'}
                nonSelectedGenres={nonSelectedGenre}
                selectedGenres={selectedGenre}
                selectedMovieTheaters={selectedMovieTheaters}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedActors={selectedActors}
            />
        </>
    );
}