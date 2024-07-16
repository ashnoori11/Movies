import { ErrorMessage, Field } from "formik";


export default function TextField(props: textFieldProps) {
    return (
        <>
            <div className="row col-md-12 mb-3">
                <div className="col-md-1">
                    <label htmlFor={props.field}>{props.displayName}</label>
                </div>
                <div className="col-md-11">
                    <Field name={props.field} className="form-control" type={props.type} id={props.field} placeholder={props.placeholder} />
                    <ErrorMessage name={props.field}>{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                </div>
            </div>
        </>
    );
}

interface textFieldProps {
    field: string;
    displayName: string;
    placeholder: string;
    type: 'text' | 'password';
}

TextField.defaultProps = {
    placeholder: '',
    type: 'text'
}
