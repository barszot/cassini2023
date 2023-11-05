function CoordinatesSelector(props)
{
    let {x1} = props;
    const {setX1} = props;
    let {y1} = props;
    const {setY1} = props;
    let {x2} = props;
    const {setX2} = props;
    let {y2} = props;
    const {setY2} = props;

    const handleInputX1 = (e) =>{
        setX1(e.target.value);
    };
    const handleInputY1 = (e) =>{
        setY1(e.target.value);
    };
    const handleInputX2 = (e) =>{
        setX2(e.target.value);
    };
    const handleInputY2 = (e) =>{
        setY2(e.target.value);
    };

    return <div className="flex-container">
        <div className="map-point">
            <p>Coordinates of the start point</p>
            <div className="flex-container">
                <div className="time-item">
                <p>Latitude</p>
                <input type="number"
                placeholder="Start point's latitude..."
                value={x1}
                onChange={handleInputX1}
                name = "x1_input"
                />
                </div>
                <div className="time-item">
                <p>Longitude</p>
                <input type="number"
                placeholder="Start point's longitude..."
                value={y1}
                onChange={handleInputY1}
                name = "y1_input"
                />
                </div>
            </div>
        </div>
        <div className="map-point">
            <p>Coordinates of the end point</p>
            <div className="flex-container">
                <div className="time-item">
                <p>Latitude</p>
                <input type="number"
                placeholder="End point's latitude..."
                value={x2}
                onChange={handleInputX2}
                name = "x2_input"
                />
                </div>
                <div className="time-item">
                <p>Longitude</p>
                <input type="number"
                placeholder="End point's longitude..."
                value={y2}
                onChange={handleInputY2}
                name = "y2_input"
                />
                </div>
            </div>
        </div>
    </div>


}

/*
<div className="flex-container">
            <div className="time-item">
            <input type="number"
                placeholder="Liczba dni..."
                value={days}
                onChange={handleInputDays}
                name = "days_input"
            />
            <p>dni, </p>
            </div>
            <div className="time-item">
            <input type="number"
                placeholder="Liczba godzin..."
                value={hours}
                onChange={handleInputHours}
                name = "hours_input"
            />
            <p>godzin, </p>
            </div>
            <div className="time-item">
            <input type="number"
                placeholder="Liczba minut..."
                value={minutes}
                onChange={handleInputMinutes}
                name = "minutes_input"
            />
            <p>minut</p>
            </div>
            </div>
*/
export default CoordinatesSelector;