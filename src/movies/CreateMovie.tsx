import MovieForm from "./MovieForm";
import * as Yup from 'yup';

export default function CreateMovie() {

    const theModel = {
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
            <MovieForm
                model={{ ...theModel }}
                onSubmit={async values => {
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
            />
        </>
    );
}