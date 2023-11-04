function DeliveryTimeInput(props)
{
    let {days} = props;
    const {setDays} = props;
    let {hours} = props;
    const {setHours} = props;
    let {minutes} = props;
    const {setMinutes} = props;
    const handleInputDays = (e) =>{
        setDays(e.target.value);
    };
    const handleInputHours = (e) =>{
        setHours(e.target.value);
    };
    const handleInputMinutes = (e) =>{
        setMinutes(e.target.value);
    };
    return <div>
            <input type="number"
                placeholder="Liczba dni..."
                value={days}
                onChange={handleInputDays}
                name = "days_input"
            />
            <p>dni, </p>
            <input type="number"
                placeholder="Liczba godzin..."
                value={hours}
                onChange={handleInputHours}
                name = "hours_input"
            />
            <p>godzin, </p>

            <input type="number"
                placeholder="Liczba minut..."
                value={minutes}
                onChange={handleInputMinutes}
                name = "minutes_input"
            />
            <p>minut</p>
            </div>
}

export default DeliveryTimeInput;