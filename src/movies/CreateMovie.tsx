import MovieForm from "./MovieForm";
import * as Yup from 'yup';
import { genreDTO } from '../genres/genres.model';
import { movieCreationDTO, movieFormInformation } from './movies.model';
import { movieTheatersDTO } from '../movietheaters/movieTheater.model';
import { useEffect, useState } from "react";
import axios from "axios";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { AxiosResponse } from 'axios';
import Loading from "../utils/Loading";
import { convertMovieFormData } from "../utils/FormDataUtils";
import { useHistory } from "react-router-dom";

export default function CreateMovie() {

    const [errors, setErrors] = useState<string[]>([]);
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheatersDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        try {
            axios.get(`${urlMovies}/MovieFormInformations`)
                .then((response: AxiosResponse<movieFormInformation>) => {

                    // @ts-ignore
                    let actualData = response.data[0];

                    setNonSelectedGenres(actualData.genres);
                    setNonSelectedMovieTheaters(actualData.movieTheaters);
                    setLoading(false);

                }).catch(errors => {
                    setErrors(errors.response.data);
                });
        }
        catch (e) {
            console.error(e);
        }
    }, [])

    const create = async (movie: movieCreationDTO) => {
        try {
            const formData = convertMovieFormData(movie);

            await axios({
                method: 'post',
                url: urlMovies,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {
                    history.push(`/movies/${response.data.data}`);
                })
                .catch(errors => {
                    if (errors.response.data) {
                        setErrors(errors.response.data);
                    }
                });
        }
        catch (e) {
            console.log(e);
        }
    }

    const theModel: movieCreationDTO = {
        title: '',
        inTheaters: false,
        trailer: '',
        releaseDate: new Date(),
        poster: undefined,
        posterURL: undefined
    }

    return (
        <>
            <h3>Create Movie</h3>

            {loading ? <Loading /> : errors.length > 1 ? <DisplayErrors errors={errors} /> :
                <MovieForm
                    model={{ ...theModel }}
                    onSubmit={async (values, actions) => {

                        await create(values);
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('this field is required')
                            .firstLetterUppercase()
                    })}
                    selectedGenres={[]}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedMovieTheaters={[]}
                    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                    selectedActors={[]}
                />
            }
        </>
    );
}