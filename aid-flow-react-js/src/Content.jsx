import { useState, useEffect} from 'react'
import MassOfCargoInput from './MassOfCargoInput';
import XOfCargoInput from './XOfCargoInput';
import YOfCargoInput from './YOfCargoInput';
import ZOfCargoInput from './ZOfCargoInput';
import PyButton from './PyButton';
import DeliveryTimeInput from './DeliveryTimeInput';
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
function Content(){
    const [massOfCargo, setMassOfCargo] = useState(0);
    const [xOfCargo, setXOfCargo] =  useState(0);
    const [yOfCargo, setYOfCargo] =  useState(0);
    const [zOfCargo, setZOfCargo] =  useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);

    const [pyResponse, setPyResponse] = useState('');

    useEffect(()=>{
        getapi(helloURL+"?"
        +"mass="+String(massOfCargo)+"&x="+String(xOfCargo)
        +"&y="+String(yOfCargo)+"&z="+String(zOfCargo)
        +"&minutes="+String(totalMinutes)
        , setPyResponse);
        console.log(pyResponse);
    }
    , [massOfCargo, xOfCargo, yOfCargo, zOfCargo, totalMinutes]);
    useEffect(()=>
    {
        console.log(days, hours, minutes);
        setTotalMinutes(parseInt(days, 10)*24*60+parseInt(hours, 10)*60+parseInt(minutes, 10));
        console.log("TOTAL", totalMinutes);
        
    },[days, hours, minutes]);
    return <div id="content">
                <p>CASSINI 2023</p>
                <div className="div-1">
                    <DeliveryTimeInput days={days}
                        setDays = {setDays}
                        hours={hours}
                        setHours={setHours}
                        minutes={minutes}
                        setMinutes={setMinutes}
                    />
                    <p>Czas w minutach: {totalMinutes}</p>
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

