import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css';

export default function MarkdownField(props: markdownFieldProps) {
    const { values } = useFormikContext<any>();

    return (
        <div className="row col-md-12 mb-3 form-markdown">
            <div className="col-md-1">
                <label htmlFor={props.field}>{props.displayName}</label>
            </div>
            <div className="col-md-11">
                <Field name={props.field} as="textarea" className="form-textarea form-control" />
                <div className="mt-3">
                    <label>{props.displayName} (preview):</label>
                    <div className="markdown-container">
                        <ReactMarkdown>{values[props.field]}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>

    );
}

interface markdownFieldProps {
    displayName: string;
    field: string;
}