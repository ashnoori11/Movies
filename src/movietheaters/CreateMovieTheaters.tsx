import axios from "axios";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";
import * as Yup from 'yup';
import { urlMovieTheaters } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { ErrorMessage } from 'formik';

export default function CreateMovieTheaters() {

    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();
    const create = async (movieTheater: movieTheaterCreationDTO) => {
        try {
            await axios.post(urlMovieTheaters, movieTheater)
                .then(response => {

                    history.push("/movietheaters");
                })
                .catch(error => {

                    if (error && error.response) {
                        setErrors(error.response.data);
                    }
                });
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <h3>Create Movie Theaters</h3>
            <DisplayErrors errors={errors} />
            <MovieTheaterForm
                model={{ name: '' }}
                onSubmit={async values => {
                    await create(values);
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('this is field is required')
                        .firstLetterUppercase()
                })}
            />
        </>
    );
}