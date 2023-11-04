function TypeOfHelpSelector(props)
{
    let {typeOfHelpName} = props;
    const {setTypeOfHelpName} = props;
    let {typeOfHelpUnits} = props;
    let {setTypeOfHelpUnits} = props;
    let {data} = props;
    const handleHelpSelection = (e) => {
        setTypeOfHelpName(e.target.value.split('&')[0]);
        setTypeOfHelpUnits(e.target.value.split('&')[1]);
    };
    return  <div id="type_of_help_selector">
                <select value={typeOfHelpName} onChange={handleHelpSelection}
                name="type_of_help_selector">
                <option value="" key="empty" defaultValue>Wybierz typ ładunku</option>
                {data.map((typeOfHelp) => (
                    <option key = {typeOfHelp.name}
                    value = {`${typeOfHelp.name}&${typeOfHelp.units}`}>
                    {typeOfHelp.name}
                    </option>
                ))}
                </select>
            </div>
}

export default TypeOfHelpSelector;
