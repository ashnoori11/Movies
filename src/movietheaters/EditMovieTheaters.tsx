import MovieTheaterForm from "./MovieTheaterForm";
import * as Yup from 'yup';

export default function EditMovieTheaters() {
    return (
        <>
            <h3>Edit Movie Theaters</h3>
            <MovieTheaterForm
                model={{ name: 'Oppenheimer' }}
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