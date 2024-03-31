import { Formik, FormikHelpers, Form } from 'formik';
import { actorCreationDTO } from "./actors.model";
import TextField from '../foms/TextField';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
import DateField from '../foms/DateField';
import ImageField from '../foms/ImageField';
import MarkdownField from '../foms/MarkdownField';

export default function ActorForm(props: actorFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName='Name' field='name' placeholder="enter the Name" />
                    <DateField displayName='Date Of Birth' field='dateOfBirth' dateStringFormat={props.dateStringFormat} />
                    <ImageField displayName='Picture' field='picture'
                        imageUrl={props.model.pictureUrl} />
                    <MarkdownField displayName='Biography' field='biography' />
                    <Button disabled={formikProps.isSubmitting}
                        className='btn btn-primary mb-3'
                        type='submit'>
                        Save Changes
                    </Button>
                    <Link to="/actors" className="btn btn-secondary mb-3">
                        Cancel
                    </Link>
                </Form>
            )}
        </Formik>
    );
}

interface actorFormProps {
    model: actorCreationDTO;
    onSubmit(values: actorCreationDTO, actions: FormikHelpers<actorCreationDTO>): void;
    validationSchema: any;
    dateStringFormat: string
}

ActorForm.defaultProps = {
    dateStringFormat: 'zh-Hans-CN'
}