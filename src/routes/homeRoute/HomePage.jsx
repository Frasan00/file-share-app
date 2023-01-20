import React, { useState, useEffect } from "react";
import axios from "axios";
import homeStyle from "./homeComponents/homeStyle.css";
//components
import NavBar from "./homeComponents/NavBar";
import FileInput from "./homeComponents/FileInput";
import FileList from "./homeComponents/FIleList";

export const HomePage = ({userName, jwt, setIsLogged}) => {

    const [searchedFile, setSearchedFile] = useState("");
    const [input, setInput] = useState(null);
    const [fileList, setFileList] = useState(null);

    // handlers
    const handleLogOut = () => {
        setIsLogged(false);
        axios.delete("http://localhost:5000/auth/logout/"+userName)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    return (
        <div className="Homepage">
            <NavBar userName={userName} handleLogOut={handleLogOut}/>
            <FileInput input={input} setInput={setInput}/>
            <FileList listaFile={fileList}/>
        </div>
    );
};