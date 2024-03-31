import MovieTheaterForm from "./MovieTheaterForm";
import * as Yup from 'yup';

export default function CreateMovieTheaters() {
    return (
        <>
            <h3>Create Movie Theaters</h3>
            <MovieTheaterForm
                model={{ name: '' }}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
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