import { useState, useEffect} from 'react'
import TypeOfHelpSelector from './TypeOfHelpSelector';
import MassOfCargoInput from './MassOfCargoInput';
import XOfCargoInput from './XOfCargoInput';
import YOfCargoInput from './YOfCargoInput';
import ZOfCargoInput from './ZOfCargoInput';
import PyButton from './PyButton';

const catfact_url = 
      "https://catfact.ninja/fact";


// Defining async function
async function getapi(url, setFunc) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    let data = await response.json();
    setFunc(data["fact"]);
}
// Calling that async function
const helloURL="http://127.0.0.1:8000/hello"
function Content({prop}){
    const helpTypes = prop;
    const [typeOfHelpName, setTypeOfHelpName] = useState('');
    const [typeOfHelpUnits, setTypeOfHelpUnits] = useState('');
    const [massOfCargo, setMassOfCargo] = useState(0);
    const [xOfCargo, setXOfCargo] =  useState(0);
    const [yOfCargo, setYOfCargo] =  useState(0);
    const [zOfCargo, setZOfCargo] =  useState(0);
    const [deliveryTime, setDeliveryTime] = useState(0);
    const [pyResponse, setPyResponse] = useState('');

    useEffect(()=>{
        getapi(helloURL+"?"+"helptype="+typeOfHelpName
        +"&mass="+String(massOfCargo)+"&x="+String(xOfCargo)
        +"&y="+String(yOfCargo)+"&z="+String(zOfCargo)
        , setPyResponse);
        console.log(pyResponse);
    }
    , [massOfCargo, xOfCargo, yOfCargo, zOfCargo, typeOfHelpName]);

    return <div id="content">
                <p>CASSINI 2023</p>
                <div className="div-1">
                    <TypeOfHelpSelector typeOfHelpName={typeOfHelpName}
                        setTypeOfHelpName={setTypeOfHelpName}
                        typeOfHelpUnits={typeOfHelpUnits}
                        setTypeOfHelpUnits={setTypeOfHelpUnits}
                        data={helpTypes}
                    />
                    <p>Wybrano: {typeOfHelpName}</p>
                </div>

                <div className="div-2">
                    <p>Podaj długość (w cm)</p>
                    <XOfCargoInput xOfCargo={xOfCargo}
                    setXOfCargo={setXOfCargo}/>
                    <p>Wybrana długość = {xOfCargo} cm</p>
                    
                    <p>Podaj szerokość (w cm)</p>
                    <YOfCargoInput yOfCargo={yOfCargo}
                    setYOfCargo={setYOfCargo}/>
                    <p>Wybrana szerokość = {yOfCargo} cm</p>
                    
                    <p>Podaj wysokość (w cm)</p>
                    <ZOfCargoInput zOfCargo={zOfCargo}
                    setZOfCargo={setZOfCargo}/>
                    <p>Wybrana wysokość = {yOfCargo} cm</p>

                    <p>Podaj masę (w kilogramach)</p>
                    <MassOfCargoInput massOfCargo={massOfCargo}
                    setMassOfCargo = {setMassOfCargo}/>
                    <p>Wybrana masa = {massOfCargo} kg</p>

                </div>                
                <PyButton/>
                <p>
                {pyResponse}
                </p>
            </div>
}

export default Content;

