import MovieTheaterForm from "./MovieTheaterForm";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';

export default function EditMovieTheaters() {

    const { id }: any = useParams();
    const theModel = {
        name: 'Oppenheimer',
        latitude: 35.7976373464631,
        longitude: 51.412099599838264,
    }
    return (
        <>
            <h3>Edit Movie Theaters</h3>
            <MovieTheaterForm
                model={{ ...theModel }}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                    console.log(`the id is : ${id}`);
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