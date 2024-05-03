import * as Yup from 'yup';
import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from './genres.model';

export default function EditGenre() {

    return (
        <>
            <EditEntity<genreCreationDTO, genreDTO>
                url={urlGenres}
                entityName="Genres"
                returnUrl="/genres"
            >
                {
                    (entity, edit) =>
                        <GenreForm
                            model={entity}
                            onSubmit={async value => {
                                await edit(value);
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .required('this field is required')
                                    .firstLetterUppercase()
                            })}
                        />


                }
            </EditEntity>
        </>
    );
}