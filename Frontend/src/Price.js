import React, { useState } from 'react';
import "./Price.css";

function Price (props){
    const [price, setPrice] = useState(0);

    const set = (event) => {
        var tmp = (event.target.value === "") ? "" : parseFloat(event.target.value);

        setPrice(tmp);
        props.update(props.id,tmp);
    }

    const del = () => {
        props.del(props.id);
    }

    return (
        <div>
            <label>Prices:</label>
            {(props.value != null) ? <input className="input" type="number" defaultValue = {props.value} onInput={set}></input> :
                <input className="input" type="number" onInput={set}></input>}
            <button id="del" onClick={del}>x</button>
        </div>
    )
}

export default Price;