import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../services/auth-service";
import { useSelector, useDispatch } from "react-redux";
import { getUsersThunk, updateUserThunk, profileThunk } from "../services/auth-thunk";
import states from '../register-page/states.json';

const ManagementDashboard = () => {
    const [username, setUsername] = useState("");
    const [lastName, setLastname] = useState("");
    const [firstName, setFirstname] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState();
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
    });

    const handleUpdateUser = async () => {
        const user = await updateUser(newUser._id, newUser);
        setUsers(users.map((user) => (user._id === newUser._id ? newUser : user)));
    };

    const handleEditUser = async (user) => {
        setNewUser(user);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="input-group">
                <div className="col col-2">
                    <select id="inputState" className="form-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
                        <option defaultValue>Username</option>
                        <option>Email</option>
                        <option>First Name</option>
                        <option>Last Name</option>
                        <option>State</option>
                        <option>Role</option>
                        <option>Phone Number</option>
                    </select>
                </div>
                <div className="col col-6">
                    <input type="text" className="form-control" aria-label="Text input with dropdown button" />
                </div>
                <div className="col">
                    <button type="button" className="btn btn-secondary">Search</button>
                </div>
            </div>
            <div style={{ overflowX: "auto" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Password</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">State</th>
                            <th scope="col">Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td><input type="text" value={user.username} /></td>
                                <td><input type="text" value={user.email} /></td>
                                <td>
                                    <select id="role" name="role" value={user.role} onChange={(event) => setState(event.target.value)}>
                                        <option value="PetOwner" selected={user.role === "PetOwner"}>PetOwner</option>
                                        <option value="Administrator" selected={user.role === "Administrator"}>Administrator</option>
                                        <option value="Volunteer" selected={user.role === "Volunteer"}>Volunteer</option>
                                    </select>
                                </td>
                                <td><input type="text" value={user.password} /></td>
                                <td><input type="text" value={user.firstName} /></td>
                                <td><input type="text" value={user.lastName} /></td>
                                <td><input type="text" value={user.phoneNumber} /></td>
                                <td><input type="text" value={user.state} /></td>
                                <td><input type="text" value={user.ZipCode} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagementDashboard;
