import { useParams } from "react-router-dom";
import ActorForm from "./ActorForm";
import * as Yup from 'yup';
import EditEntity from "../utils/EditEntity";
import { actorCreationDTO, actorDTO } from './actors.model';
import { urlActors } from "../endpoints";
import { convertActorToFormData } from "../utils/FormDataUtils";

export default function EditActor() {

    const transform = (actor: actorDTO): actorCreationDTO => {
        return {
            name: actor.name,
            pictureUrl: actor.biography,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <EditEntity<actorCreationDTO, actorDTO>

            url={urlActors}
            returnUrl="/actors"
            entityName="Actors"
            transformFormData={convertActorToFormData}
            transform={transform}
        >

            {(entity, edit) =>

                <ActorForm
                    model={entity}
                    onSubmit={async values => await edit(values)}
                    validationSchema={
                        Yup.object({
                            name: Yup.string().required('this field is required')
                                .firstLetterUppercase(),
                            dateOfBirth: Yup.date().nullable().required('this field is required')
                        })
                    }
                    dateStringFormat='zh-Hans-CN'
                />

            }

        </EditEntity>
    );
}




