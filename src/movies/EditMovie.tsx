import { useHistory, useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import * as Yup from 'yup';
import { movieCreationDTO, moviesPutGetDTO } from './movies.model';
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { convertMovieFormData } from "../utils/FormDataUtils";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";

export default function EditMovie() {

    const { id }: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviesPutGetDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {

        try {

            axios.get(`${urlMovies}/GetMovieDetailsForEdit/${id}`)
                .then((response: AxiosResponse<moviesPutGetDTO>) => {

                    //@ts-ignore
                    let theData: moviesPutGetDTO = response.data.data[0];
                    console.log(theData);
                    console.log(response);

                    const model: movieCreationDTO = {
                        title: theData.title,
                        inTheaters: theData.inTheaters,
                        trailer: theData.trailer,
                        summery: theData.summery,
                        releaseDate: new Date(theData.releaseDate),
                        posterURL: theData.posterURL,
                    }

                    setMovie(model);
                    setMoviePutGet(theData);

                })
                .catch(errors => {
                    if (errors) {
                        setErrors(errors.response.data);
                    }
                });

        } catch (e) {
            console.log(e);
        }

    }, [id])

    const edit = async (movieToEdit: movieCreationDTO) => {
        try {
            const formData = convertMovieFormData(movieToEdit);
            await axios({
                method: 'put',
                url: `${urlMovies}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            history.push(`/movie/${id}`);
        }
        catch (errors) {

            //@ts-ignore
            setErrors(errors.response.data);
        }
    }

    return (
        <>
            <h3>Edit Movie</h3>
            <DisplayErrors errors={errors} />

            {movie && moviePutGet ? <MovieForm
                model={movie}
                onSubmit={async (values, actions) => {

                    await edit(values);
                }}
                validationSchema={Yup.object({
                    //@ts-ignore
                    title: Yup.string().required('this field is required').firstLetterUppercase()
                })}
                dateStringFormat={'en-CA'}
                nonSelectedGenres={moviePutGet?.nonSelectedGenre}
                selectedGenres={moviePutGet?.selectedGenre}
                selectedMovieTheaters={moviePutGet?.selectedMovieTheaters}
                nonSelectedMovieTheaters={moviePutGet?.nonSelectedMovieTheaters}
                selectedActors={moviePutGet?.selectedActors}
            /> : <Loading />}


        </>
    );
}