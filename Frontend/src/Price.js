import  React, { useState } from 'react';

function Price (props){
    const [price, setPrice] = useState(0);

    const set = (event) => {
        var tmp = (event.target.value === "") ? "" : parseFloat(event.target.value);

        setPrice(tmp);
        props.update(props.id,tmp);
    }

    const d = () => {
        props.del(props.id);
    }

    return (
        <div>
            <label>Prices:</label>
            {(props.value != null) ? <input type="number" value = {props.value} onInput={set}></input> :
                <input type="number" onInput={set}></input>}
            <button onClick={d}>x</button>
        </div>
    )
}

export default Price;