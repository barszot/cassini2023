import { useState, useEffect} from 'react'
import MassOfCargoInput from './MassOfCargoInput';
import XOfCargoInput from './XOfCargoInput';
import YOfCargoInput from './YOfCargoInput';
import ZOfCargoInput from './ZOfCargoInput';
import PyButton from './PyButton';
import DeliveryTimeInput from './DeliveryTimeInput';
import VeichlesList from './VeichlesList';
import CoordinatesSelector from './CoordinatesSelector';
import logo from "./logo_good.png";
import ImageButton from './ImageButton';
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
    const [x1,setX1] = useState(12.65125);
    const [y1,setY1] = useState(-7.99589);
    const [x2,setX2] = useState(12.6997);
    const [y2,setY2] = useState(-8.0114);
    const [imgNum, setImgNum] = useState(1);
    const [pyResponse, setPyResponse] = useState('');
    const PyButtonOnClick = () =>
    {
        if(xOfCargo>0 & (yOfCargo>0 & (zOfCargo>0 &(massOfCargo>0 &(totalMinutes>0))))){
            getapi(helloURL+"?"
            +"mass="+String(massOfCargo)+"&x="+String(xOfCargo)
            +"&y="+String(yOfCargo)+"&z="+String(zOfCargo)
            +"&minutes="+String(totalMinutes)
            +"&x1="+String(x1)+"&y1="+String(y1)
            +"&x2="+String(x2)+"&y2="+String(y2)
            , setPyResponse);
        }
        else{
            alert("None of the provided dimensions, weight, or the total time can be equal to zero or negative!")
        }
    }
    useEffect(()=>
    {
        console.log(days, hours, minutes);
        let newDays = days;
        let newHours=hours;
        let newMinutes=minutes;
        if(newDays!==0 & !newDays){
            newDays=0;
        }
        if(newHours!==0 & !newHours){
            newHours=0;
        }
        if(newMinutes!==0 & !newMinutes){
            newMinutes=0;
        }
        setTotalMinutes(parseInt(newDays, 10)*24*60+parseInt(newHours, 10)*60+parseInt(newMinutes, 10));
        console.log("TOTAL", totalMinutes);
        
    },[days, hours, minutes]);
    return <div id="content">

                <div class="logo2">
                    <img src={logo}/>
                </div>
                <ImageButton imgNum={imgNum} setImgNum={setImgNum}/>
                <div className='cors-select'>
                    <h1>Insert the coordinates here:</h1>
                <CoordinatesSelector x1={x1} setX1={setX1}
                y1={y1} setY1={setY1} x2 = {x2} setX2={setX2}
                y2={y2} setY2={setY2}/>
                </div>
                <div className="t-select">
                    <h1>Insert the critical time here:</h1>
                    <DeliveryTimeInput days={days}
                        setDays = {setDays}
                        hours={hours}
                        setHours={setHours}
                        minutes={minutes}
                        setMinutes={setMinutes}
                    />
                    <h2>Total time (in hours): {parseFloat(totalMinutes/60).toFixed(2)}h</h2>
                </div>

                <div className="dim-select">
                    <h2>Insert mass and dimensions of package here:</h2>
                    <div className='flex-container'>
                        <div className='time-item'>
                        <p>Mass (in kg)</p>
                        <MassOfCargoInput massOfCargo={massOfCargo}
                        setMassOfCargo = {setMassOfCargo}/>
                        </div>
                        <div className='time-item'>
                        <p>Lenght (in cm)</p>
                        <XOfCargoInput xOfCargo={xOfCargo}
                        setXOfCargo={setXOfCargo}/>
                        </div>
                        <div className='time-item'>
                        <p>Width (in cm)</p>
                        <YOfCargoInput yOfCargo={yOfCargo}
                        setYOfCargo={setYOfCargo}/>
                        </div>
                        <div className='time-item'>
                        <p>Height (in cm)</p>
                        <ZOfCargoInput zOfCargo={zOfCargo}
                        setZOfCargo={setZOfCargo}/>
                        </div>
                    </div>


                </div>                
                <PyButton handleClick={PyButtonOnClick}/>
                <VeichlesList text={pyResponse}/>
            </div>
}

export default Content;

