import GenreForm from "./GenreForm";
import * as Yup from 'yup';

export default function CreateGenre() {
    return (
        <>
            <h3>Create Genre</h3>

            <GenreForm model={{ name: '' }} onSubmit={async value => {

                await new Promise(r => setTimeout(r, 3000));
                console.log(value);
            }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('this field is required')
                        .firstLetterUppercase()
                })}
            />
        </>
    );
}