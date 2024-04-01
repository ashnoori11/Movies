import { useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import * as Yup from 'yup';

export default function EditMovie() {

    const { id }: any = useParams();
    const theModel = {
        title: 'Toy Story',
        inTheaters: false,
        trailer: 'Andy s favourite toy, Woody, is worried that after Andy receives his birthday gift, a new toy called Buzz Lightyear, his importance may get reduced.He thus hatches a plan to eliminate Buzz.',
        releaseDate: new Date('1995-02-22'),
        poster: undefined,
        posterURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Toy_Story.jpg/220px-Toy_Story.jpg'
    }

    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm
                model={{ ...theModel }}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                    console.log(`the id is ${id}`);
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('this field is required')
                        .firstLetterUppercase(),
                    poster: Yup.mixed().test(
                        "required",
                        "Please select a file",
                        (files: FileList) => files?.length > 0)
                })}
                dateStringFormat={'en-CA'}
            />
        </>
    );
}