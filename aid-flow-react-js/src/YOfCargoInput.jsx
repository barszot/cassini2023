function YOfCargoInput(props)
{
    let {yOfCargo} = props;
    const {setYOfCargo} = props;
    const handleInputYOfCargo = (e) =>{
        setYOfCargo(e.target.value);
    };
    return <input type="number"
                placeholder="Your fav number"
                value={yOfCargo}
                onChange={handleInputYOfCargo}
                name = "y_of_cargo_input"
            />

}

export default YOfCargoInput;