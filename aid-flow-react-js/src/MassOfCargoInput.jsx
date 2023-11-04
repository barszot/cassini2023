function MassOfCargoInput(props)
{
    let {massOfCargo} = props;
    const {setMassOfCargo} = props;
    const handleInputMassOfCargo = (e) =>{
        setMassOfCargo(e.target.value);
    };
    return <input type="number"
                placeholder="Podaj masę (w kg)..."
                value={massOfCargo}
                onChange={handleInputMassOfCargo}
                name = "mass_of_cargo_input"
            />

}

export default MassOfCargoInput;