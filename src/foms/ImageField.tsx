import { ChangeEvent, useState } from "react";
import { toBase64 } from '../helpers/fileHelpers';
import { FormikContext, useFormikContext } from "formik";

export default function ImageField(props: imageFieldProps) {

    const [imageBase64, setImageBase64] = useState('');
    const [imageUrl, setImageUrl] = useState(props.imageUrl);
    const { values } = useFormikContext<any>();

    const divStyle = { marginTop: '10px' };
    const imageStyle = { width: '450px' }

    const handleOnChange = (eventArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventArgs.currentTarget.files) {
            const file = eventArgs.currentTarget.files[0];
            if (file) {
                toBase64(file)
                    .then((base64Representation: string) => {
                        setImageBase64(base64Representation);
                    })
                    .catch(error => console.error(error));
                setImageUrl('');
                values[props.field] = file;
            }
            else {
                setImageBase64('');
            }
        }
    }

    return (

        <div className="row col-md-12 mb-3">
            <div className="col-md-1">
                <label htmlFor={props.field}>{props.displayName}</label>
            </div>
            <div className="col-md-11">
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            {
                imageBase64 ? <div>
                    <div style={divStyle}>
                        <img style={imageStyle} src={imageBase64} className="img-thumbnail rounded" alt="selcted image" />
                    </div>
                </div> : null
            }

            {
                imageUrl ? <div>
                    <div style={divStyle}>
                        <img style={imageStyle} src={imageUrl} className="img-thumbnail rounded" alt="selcted image" />
                    </div>
                </div> : null
            }
        </div>
    );
}

interface imageFieldProps {
    field: string;
    displayName: string;
    imageUrl?: string;
}