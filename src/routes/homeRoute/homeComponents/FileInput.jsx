import axios from "axios";

const FileInput = ({input, setInput, fileList, setFileList, jwt, userName}) =>{

    const handleFileInput = (event) => { setInput(event.target.files[0]); };
    const handleUpload = () => { 
        // since sendFile it's a stream of data, a request with the auth tiken is made, and if it's succesful, the file is uploaded
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        };
        axios.get('http://localhost:5000/file/'+userName, config)
        .then((res) => {
            upload();
        })
        .catch((err) => console.err(err));
    };

    function upload(){
        if (!input) return console.log("No file inserted");
        const readStream = new FileReader();
        readStream.readAsArrayBuffer(input);

        readStream.onload = () => {
            axios.post("http://localhost:5000/file/upload/"+input.name+"/"+userName+"/"+input.size, readStream.result)
            .then(res => {
                console.log("File uploaded correctly");
                setFileList([...fileList, input.name])
                // reset file
                setInput(null);
            })
            .catch(error => {
            console.log(error);
            });
        };
    };

    return (
        <div className="FileInputFather">
            <h1>All files</h1>
            <div className="FileInput">
                <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileInput}></input>
                <button className="btn btn-outline-primary" onClick={() => handleUpload()}>Upload File!</button>
            </div>
        </div>
    );
};

export default FileInput;