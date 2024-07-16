import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJwt";
import AuthenticationContext from "./AuthenticationContext";
import { useHistory } from "react-router-dom";


export default function Register() {

    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const history = useHistory();

    async function register(credentials: userCredentials) {

        setErrors([]);
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentials);

            if (response.data.errors) {
                setErrors(response.data.errors);
            }
            else {
                saveToken(response.data);
                update(getClaims());
                history.push('/');
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (<>
        <h3>Register</h3>
        <DisplayErrors errors={errors} />
        <AuthForm
            model={{ email: '', password: '' }}
            onSubmit={async values => await register(values)}
        />
    </>);
}