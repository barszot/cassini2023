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
    return <div className="flex-container">
            <div className="time-item">
            <p>Days</p>
            <input type="number"
                placeholder="Days..."
                value={days}
                onChange={handleInputDays}
                name = "days_input"
            />

            </div>
            <div className="time-item">
            <p>Hours</p>
            <input type="number"
                placeholder="Hours..."
                value={hours}
                onChange={handleInputHours}
                name = "hours_input"
            />
            </div>
            <div className="time-item">
            <p>Minutes</p>
            <input type="number"
                placeholder="Minutes..."
                value={minutes}
                onChange={handleInputMinutes}
                name = "minutes_input"
            />
            </div>
            </div>
}

export default DeliveryTimeInput;