import axios, { AxiosResponse } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";


export default function EditEntity<T, TRead>(props: editEntityProps<T, TRead>) {

    const { id }: any = useParams();
    const [entity, setEntity] = useState<T>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((response: AxiosResponse<any>) => {

                console.log(response.data.data[0]);
                setEntity(response.data.data[0]);
            })
    }, [id]);

    const edit = async (entityToEdit: T) => {
        try {

            if (props.transformFormData) {
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: 'put',
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
            history.push(props.returnUrl);
        }
        catch (error) {

            // @ts-ignore
            if (error && error.response) {

                // @ts-ignore
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <h3>{props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity, edit) : <Loading />}
        </>
    );
}


interface editEntityProps<T, TRead> {
    url: string;
    entityName: string;
    returnUrl: string;
    transform(entity: TRead): T;
    transformFormData?(model: T): FormData;
    children(entity: T, edit: (entity: T) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity,
}
