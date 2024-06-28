import { useFormikContext } from "formik";
import { useState } from "react";

export default function DateField(props: dateFieldsProps) {

    const { values, validateForm, touched, errors } = useFormikContext<any>();

    const dateFormat = (date: string): string => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
    }

    const showDateFormat = (inputDate: Date): Date => {

        const dateObj = new Date(inputDate);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        const formattedDateAsDate = new Date(year, month - 1, day);
        return formattedDateAsDate;
    }

    return (
        <div className="row col-md-12 mb-3">
            <div className="col-md-1">
                <label htmlFor={props.field}>{props.displayName}</label>
            </div>
            <div className="col-md-11">
                <input className={`form-control ${props.className}`}
                    type="date" id={props.field} name={props.field}
                    defaultValue={new Date(values[props.field]).toLocaleDateString(props.dateStringFormat)}
                    key={`${Math.floor((Math.random() * 1000))}-min`}
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
