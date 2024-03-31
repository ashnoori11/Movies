import { useParams } from "react-router-dom";
import ActorForm from "./ActorForm";
import * as Yup from 'yup';

export default function EditActor() {

    const { id }: any = useParams();

    return (
        <>
            <h3>Edit Actor</h3>

            <ActorForm model={{
                name: 'Tom Holland', dateOfBirth: new Date('3-28-2024')
                , pictureUrl: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS0BoHXyTC6fiXdFd39tpPeIOMlurZorAPiD6QJwS2yZVzFQGKQq_padu4AaV6Rug9qf35tExpQkObaYLY'
            }}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 3000));
                    console.log(values);
                    console.log(`the id is : ${id}`);
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('this field is required')
                        .firstLetterUppercase(),
                    dateOfBirth: Yup.date().nullable().required('this field is required')
                })}
                dateStringFormat={'en-CA'}
            />
        </>
    );
}