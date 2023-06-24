import React, { useEffect, useState } from "react";
import { filterUsers, getUsers, deleteUser, modifyUser } from "../services/auth-service";
import { useDispatch } from "react-redux";
import { filterUsersThunk } from "../services/auth-thunk";
import states from '../register-page/states.json';
import "./dashboard.css"

const ManagementDashboard = () => {
    const [inputValue, setInputValue] = useState("");
    const [newUser, setNewUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: ""
    });
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("username");
    const dispatch = useDispatch();
    const handleSearchUser = async () => {
        const conditions = { condition: filter, value: inputValue };
        const usersResult = await dispatch(filterUsersThunk(conditions));
        const users = usersResult.payload;
        setUsers(users);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditUser = async (user) => {
        setNewUser(user);
    };

    const handleUpdateUser = async () => {
        await modifyUser(newUser._id, newUser);
        setUsers(users.map((user) => (user._id === newUser._id ? newUser : user)));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await filterUsers({ filter, inputValue });
            setUsers(users);
        };
        fetchUsers();
    }, [filter, inputValue]);
    return (
        <div>
            <div className="container">
                <div className="col col-2">
                    <select id="filter" className="form-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
                        <option value="username" defaultValue>Username</option>
                        <option value="email">Email</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="state">State</option>
                        <option value="role">Role</option>
                        <option value="phoneNumber">Phone Number</option>
                    </select>
                </div>
                <div className="col col-6">
                    <input type="text" className="form-control" aria-label="Text input with dropdown button"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)} />
                </div>
                <div className="col">
                    <button type="button" className="button" onClick={handleSearchUser}>Search</button>
                </div>
            </div>
            <div className="result" style={{ overflowX: "auto" }}>
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
                            <th scope="col" colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="10">Not found</td>
                            </tr>
                        ) : (users.map((user) => (
                            <tr key={user._id}>
                                <td><input type="text" value={user.username}
                                    onChange={(event) => setNewUser({ ...user, username: event.target.value })} /></td>
                                <td><input type="text" value={user.email}
                                    onChange={(event) => setNewUser({ ...user, email: event.target.value })} /></td>
                                <td>
                                    <select id="role" name="role" value={user.role}
                                        onChange={(event) => setNewUser({ ...user, role: event.target.value })}
                                    >
                                        <option value="PetOwner" selected={user.role === "PetOwner"}>PetOwner</option>
                                        <option value="Administrator" selected={user.role === "Administrator"}>Administrator</option>
                                        <option value="Volunteer" selected={user.role === "Volunteer"}>Volunteer</option>
                                    </select>
                                </td>
                                <td><input type="text" value={user.password}
                                    onChange={(event) => setNewUser({ ...user, password: event.target.value })}
                                /></td>
                                <td><input type="text" value={user.firstName}
                                    onChange={(event) => setNewUser({ ...user, firstName: event.target.value })}
                                /></td>
                                <td><input type="text" value={user.lastName}
                                    onChange={(event) => setNewUser({ ...user, lastName: event.target.value })}
                                /></td>
                                <td><input type="text" value={user.phoneNumber}
                                    onChange={(event) => setNewUser({ ...user, phoneNumber: event.target.value })}
                                /></td>
                                <td><input type="text" value={user.state}
                                    onChange={(event) => setNewUser({ ...user, state: event.target.value })}
                                /></td>
                                <td><input type="text" value={user.zipCode}
                                    onChange={(event) => setNewUser({ ...user, zipCode: event.target.value })}
                                /></td>
                                <td><button className="btn btn-warning" onClick={() => handleEditUser(user)}>Edit</button></td>
                                <td><button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button></td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="updateArea">
                <h4 style={{ "color": "#403f2b" }}>Update Workplace</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button className="btn btn-success float-end" onClick={handleUpdateUser}>Update</button>
                        <input placeholder="Username" value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="form-control w-75"
                        />
                        <input placeholder="Email" value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="form-control w-75"
                        />

                        <input placeholder="Password" value={newUser.password} type="password"
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="form-control w-75"
                        />
                        <input placeholder="First Name" value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            className="form-control w-75"
                        />
                        <input placeholder="Last Name" value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            className="form-control w-75"
                        />
                        <input placeholder="Phone Number" value={newUser.phoneNumber}
                            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                            className="form-control w-75"
                        />
                        <input placeholder="Zip Code" value={newUser.zipCode}
                            onChange={(e) => setNewUser({ ...newUser, zipCode: e.target.value })}
                            className="form-control w-75"
                        />
                        <select id="role" name="role" value={newUser.role} className="form-control w-75"
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                            <option value="">Role</option>
                            <option value="PetOwner" selected={newUser.role === "PetOwner"}>PetOwner</option>
                            <option value="Administrator" selected={newUser.role === "Administrator"}>Administrator</option>
                            <option value="Volunteer" selected={newUser.role === "Volunteer"}>Volunteer</option>
                        </select>
                        <select className="form-control w-75" id="State" name="state" value={newUser.state}
                            onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}>
                            {states.map((state) => (
                                <option key={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ManagementDashboard;
