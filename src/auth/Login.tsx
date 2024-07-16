import { useContext, useState } from "react";
import { authenticationResponse, userCredentials } from './auth.models';
import AuthForm from "./AuthForm";
import axios from "axios";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { getClaims, saveToken } from "./handleJwt";
import AuthenticationContext from "./AuthenticationContext";
import { useHistory } from "react-router-dom";


export default function Login(props: loginProps) {

    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const history = useHistory();

    async function login(credentials: userCredentials) {

        try {
            setErrors([]);
            const response = await axios.post<authenticationResponse>(`${urlAccounts}/Login`, credentials)
            if (response.data.errors) {
                setErrors(response.data.errors);
            }
            else {
                saveToken(response.data);
                update(getClaims());
                history.push('/');
            }
            console.log(response.data);
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <h3>Login</h3>

            <DisplayErrors errors={errors} />

            <AuthForm
                model={{ email: '', password: '' }}
                onSubmit={async values => await login(values)}
            />
        </>
    );
}

interface loginProps {

}