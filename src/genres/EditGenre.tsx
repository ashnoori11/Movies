import { useParams } from "react-router-dom";
import GenreForm from "./GenreForm";
import * as Yup from 'yup';

export default function EditGenre() {

    const { id }: any = useParams();

    return (
        <>
            <h3>Edit Genre</h3>
            <GenreForm model={{ name: 'Action' }} onSubmit={async value => {

                await new Promise(r => setTimeout(r, 3000));
                console.log(value);
                console.log(`the id is : ${id}`);
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