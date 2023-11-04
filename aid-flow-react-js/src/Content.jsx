import { useState } from 'react'
import TypeOfHelpSelector from './TypeOfHelpSelector';
import MassOfCargoInput from './MassOfCargoInput';
import PyButton from './PyButton';
function Content({data}){
    const helpTypes = data;
    const [typeOfHelpName, setTypeOfHelpName] = useState('');
    const [typeOfHelpUnits, setTypeOfHelpUnits] = useState('');
    const [massOfCargo, setMassOfCargo] = useState(0);
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
                    <p>Podaj masę (w kilogramach)</p>
                    <MassOfCargoInput massOfCargo={massOfCargo}
                    setMassOfCargo = {setMassOfCargo}/>
                    <p>Wybrana masa = {massOfCargo} kg</p>
                </div>                


                <PyButton/>

            </div>
}

export default Content;


//                 <TypeOfHelpSelector typeOfHelpName={typeOfHelpName} <script src="scripts/example_script.py" type="py"></script>
// setTypeOfHelpName={setTypeOfHelpName}
// typeOfHelpUnits={typeOfHelpUnits}
// setTypeOfHelpUnits={setTypeOfHelpUnits}
// data={helpTypes}
// />