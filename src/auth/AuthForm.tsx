import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from './auth.models';
import * as Yup from 'yup';
import TextField from "../foms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";


export default function AuthForm(props: authFormProps) {
    return (

        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required('this field is required')
                    .email('you have to insert a valid email address'),
                password: Yup.string().required()
            })}
        >

            {formikProps => (
                <Form>
                    <TextField displayName="Email" field="email" />
                    <TextField displayName="Password" field="password" type="password" />

                    <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
                    <Link className="btn btn-secondry" to="/" >Cancel</Link>
                </Form>
            )}

        </Formik>
    );
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, action: FormikHelpers<userCredentials>): void
}