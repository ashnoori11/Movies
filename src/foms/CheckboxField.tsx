import { Field } from 'formik';

export default function CheckboxField(props: checkboxFieldProps) {
    return (
        <div className="mb-3 form-check">
            <Field className={`form-check-input ${props.className}`}
                id={props.field}
                name={props.field}
                type="checkbox" />
            <label htmlFor={props.field}>{props.displayName}</label>
        </div>
    );
}

interface checkboxFieldProps {
    field: string;
    className: string;
    displayName: string;
}

CheckboxField.defaultProps = {
    className: ''
}