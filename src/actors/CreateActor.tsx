import ActorForm from "./ActorForm";
import * as Yup from 'yup';

export default function CreateActor() {
    return (
        <>
            <h3>Create Actor</h3>

            <ActorForm model={{ name: '', dateOfBirth: undefined }}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('this field is required')
                        .firstLetterUppercase(),
                    dateOfBirth: Yup.date().nullable().required('this field is required')
                })} />
        </>
    );
}