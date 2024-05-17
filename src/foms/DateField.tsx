import { useFormikContext } from "formik";

export default function DateField(props: dateFieldsProps) {

    const { values, validateForm, touched, errors } = useFormikContext<any>();

    return (
        <div className="row col-md-12 mb-3">
            <div className="col-md-1">
                <label htmlFor={props.field}>{props.displayName}</label>
            </div>
            <div className="col-md-11">
                <input className={`form-control ${props.className}`}
                    type="date" id={props.field} name={props.field}
                    defaultValue={new Date(values[props.field]).toLocaleDateString(props.dateStringFormat)}
                    onChange={e => {
                        const date = new Date(`${e.currentTarget.value}T00:00:00`);
                        values[props.field] = date;
                        validateForm();
                    }}
                />
                {
                    touched[props.field] && errors[props.field] ?
                        <div className="text-danger">{errors[props.field]?.toString()}</div> : null
                }
            </div>
        </div>
    );
}

interface dateFieldsProps {
    field: string;
    displayName: string;
    className: string;
    dateStringFormat: string;
}

DateField.defaultProps = {
    className: '',
    dateStringFormat: 'en-US'
}
