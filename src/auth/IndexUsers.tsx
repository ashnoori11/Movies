import axios from "axios";
import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.models";
import Swal from "sweetalert2";

export default function IndexUsers(props: indexUsersProps) {

    async function makeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/MakeAdmin`, id);
    }

    async function removeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/RemoveAdminClaim`, id);
    }

    async function doAdmin(url: string, id: string) {

        try {
            await axios.post(url, JSON.stringify(id), {
                headers: { 'Content-Type': 'application/json' }
            });

            Swal.fire({
                title: 'Success',
                text: 'Operation finished correctly',
                icon: 'success'
            });
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred. Please try again later',
                icon: 'error'
            });

            console.log(e);
        }
    }

    return (
        <IndexEntity<userDTO>
            title="Users"
            url={`${urlAccounts}/usersList`}
        >
            {users =>
                <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => <tr key={user.id}>
                            <td>
                                <Button
                                    className="btn btn-success"
                                    onClick={() => customConfirm(() => makeAdmin(user.id),
                                        `Do you wish to make ${user.email} an admin ?`,
                                        'Do it')}>Make Admin</Button>

                                <Button
                                    className="btn btn-danger ms-2"
                                    onClick={() => customConfirm(() => removeAdmin(user.id),
                                        `Do you wish to remove admin role from ${user.email} ?`,
                                        'Do it')}>Remove Admin Role</Button>
                            </td>
                            <td>{user.email}</td>
                        </tr>)}
                    </tbody>
                </>}
        </IndexEntity>
    );

}

interface indexUsersProps {

}