import ActorForm from "./ActorForm";
import * as Yup from 'yup';
import { actorCreationDTO } from "./actors.model";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { convertActorToFormData } from "../utils/FormDataUtils";
import axios from "axios";
import { urlActors } from "../endpoints";
import { useHistory } from 'react-router-dom';

export default function CreateActor() {

    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    const create = async (actor: actorCreationDTO) => {

        try {
            const formData = convertActorToFormData(actor);

            await axios({
                method: 'post',
                url: urlActors,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            history.push('/actors');

        }
        catch (error: any) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
            console.log(error);
        }
    }


    return (
        <>
            <h3>Create Actor</h3>
            <DisplayErrors errors={errors} />
            <ActorForm model={{ name: '', dateOfBirth: undefined }}
                onSubmit={async values => {

                    await create(values);
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('this field is required')
                        .firstLetterUppercase(),
                    dateOfBirth: Yup.date().nullable().required('this field is required')
                })} />
        </>
    );
}