function ZOfCargoInput(props)
{
    let {zOfCargo} = props;
    const {setZOfCargo} = props;
    const handleInputZOfCargo = (e) =>{
        setZOfCargo(e.target.value);
    };
    return <input type="number"
                placeholder="Podaj wysokość (w cm)..."
                value={zOfCargo}
                onChange={handleInputZOfCargo}
                name = "z_of_cargo_input"
            />

}

export default ZOfCargoInput;