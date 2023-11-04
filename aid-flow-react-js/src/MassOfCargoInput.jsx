function MassOfCargoInput(props)
{
    let {massOfCargo} = props;
    const {setMassOfCargo} = props;
    const handleInputMassOfCargo = (e) =>{
        setMassOfCargo(e.target.value);
    };
    return <input type="number"
                placeholder="Your fav number"
                value={massOfCargo}
                onChange={handleInputMassOfCargo}
                name = "mass_of_cargo_input"
            />

}

export default MassOfCargoInput;