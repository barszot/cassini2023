
function JsJointScript(data){
    const data_to_pass_in = data;
    console.log("Data sent to python script:", data_to_pass_in);
    //let res = fetch('/square?param=3')
    fetch('/members').then(
        res=>res.json
    ).then(
        resData =>
        {
            console.log(resData)
        }
    )
    //result = fetchData(data);
    //console.log("RESULT:", result);
    //const python_process = spawn('python', ["./PyJointScript.py", data_to_pass_in]);

    //python_process.stdout.on('data', (data)=> {
    //console.log('Data received from python script:', data.toString());
    //});
}

export default JsJointScript;