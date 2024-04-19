import GenreForm from "./GenreForm";
import * as Yup from 'yup';
import { genreCreationDTO } from "./genres.model";
import axios from "axios";
import { urlGenres } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateGenre() {

    const history = useHistory();
    const [errors, setErrors] = useState<string[]>(new Array<string>());

    const create = async (genre: genreCreationDTO) => {
        try {
            await axios.post(urlGenres, genre);
            history.push('/genres');
        }
        catch (error) {

            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <h3>Create Genre</h3>
            <DisplayErrors errors={errors} />
            <GenreForm model={{ name: '' }} onSubmit={async value => {
                await create(value);
            }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('this field is required')
                        .max(150, "valid length is 150 characters")
                        .firstLetterUppercase()
                })}
            />
        </>
    );
}