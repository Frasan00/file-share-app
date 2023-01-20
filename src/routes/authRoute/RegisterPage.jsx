import React, { useState } from "react";
import registrationStyle from "./authStyle.css"
import axios from "axios";


export const RegisterPage = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisted, setIsRegisted] = useState(null);
    // errors
    const [noCredential, setNoCredential] = useState(null); // error if !userName or !password
    const [invalidCredential, setInvalidCredential] = useState(null);
    const [userAlreadyExists, setUserAlreadyExists] = useState(null);

    // handlers
    const handleRegister = () => {
        setIsRegisted(null) // when another attempt of registration is made, the "You succesfully registed" part has to disappear to display a possible error
        // all error must disappear when an attempt is made
        setNoCredential(null);
        setInvalidCredential(null);
        setUserAlreadyExists(null);
        if (userName === "" || password === "") return setNoCredential(true);
        const data = {
            userName: userName,
            password: password
        };
        axios.post("http://localhost:5000/auth/register", data)
        .then((res) => setIsRegisted(true))
        .catch((err) => {
            console.log(err);
            if (err.response.data === "User already exists") setUserAlreadyExists(true);
            else setInvalidCredential(true);
        });
    };
    const handleUserName = (event) => { setUserName(event.target.value); };
    const handlePassword = (event) => { setPassword(event.target.value); };

    return (
        <div className="AuthBlock">
            <h3 className="LogIn">Register to File Share!</h3>
            {!isRegisted && <p>Already registed? <a className="NewUser" href="/login">Log in here!</a></p>}

            <p className="UserNameLabel">Username </p>
            <input type="text" className="form-control" placeholder="Enter your username... " onChange={handleUserName}/>

            <p className="PasswordLabel">Password </p>
            <input type="password" className="form-control" placeholder="Enter your password... " onChange={handlePassword}/>

            <button className="btn btn-primary" onClick={() => handleRegister()}>Sign Up</button>
            {isRegisted && <p>You succesfully registed <a href="/login">click here to log in</a></p>}
            {noCredential && <p className="Error">Please enter all fields</p>}
            {userAlreadyExists && <p className="Error">This Username is already taken</p>}
            {invalidCredential && <p className="Error">The UserName must be at least three letters long Password must contain at least six characters</p>}
        </div>
    );
};