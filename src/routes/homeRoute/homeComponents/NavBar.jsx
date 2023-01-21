import React, { useState } from "react";
import axios from "axios";

const NavBar = ({userName, handleLogOut, fileList, setFileList, jwt}) =>{

    const [searchedFile, setSearchedFile] = useState("");

    const handleInput = (event) => { setSearchedFile(event.target.value); };
    const handleSearchedFile = () => { 
        // base case
        if(searchedFile === ""){
            const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
                },
            };
            axios.get('http://localhost:5000/file/'+userName, config)
            .then((res) => {
                setFileList(res.data);
                return;
            })
            .catch((err) => console.err(err));
        };
        // case is something is searched
        const out = fileList.filter((file) =>file.name === searchedFile);
        setFileList(out);
    };


    return (
        <nav class="navbar bg-primary"  data-bs-theme="light">
            <div class="container-fluid" id="NavBar">
                <a class="navbar-brand">Welcome {userName} <button class="btn btn-danger" onClick={() => handleLogOut()}>Log Out</button></a>
                <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search file..." aria-label="Search" onChange={handleInput}/>
                <button type='button' class="btn btn-outline-success btn-lg" onClick={() => handleSearchedFile()}>Search</button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar;