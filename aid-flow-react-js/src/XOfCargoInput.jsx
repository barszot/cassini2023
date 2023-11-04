function XOfCargoInput(props)
{
    let {xOfCargo} = props;
    const {setXOfCargo} = props;
    const handleInputXOfCargo = (e) =>{
        setXOfCargo(e.target.value);
    };
    return <input type="number"
                placeholder="Your fav number"
                value={xOfCargo}
                onChange={handleInputXOfCargo}
                name = "x_of_cargo_input"
            />

}

export default XOfCargoInput;