import { spawn } from 'child_process';

const data_to_pass_in = 12;
console.log("Data sent to python script:", data_to_pass_in);

const python_process = spawn('python', ["./py_trial.py", data_to_pass_in]);

python_process.stdout.on('data', (data)=> {
    console.log('Data received from python script:', data.toString());
})