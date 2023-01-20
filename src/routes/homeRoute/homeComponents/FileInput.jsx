const FileInput = ({input, setInput}) =>{

    const handleFileInput = (event) => { setInput(event.target.files[0]); };

    return (
        <div className="FileInputFather">
            <h1>All files</h1>
            <div className="FileInput">
                <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileInput}></input>
                <button className="btn btn-outline-primary">Upload File!</button>
                <button id="NewFolderBtn"className="btn btn-outline-primary">New Folder!</button>
            </div>
        </div>
    );
};

export default FileInput;