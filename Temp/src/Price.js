import  React, { useState } from 'react';

function Price (props){
    const [price, setPrice] = useState(0);

    const set = (event) => {
        var tmp = parseFloat(event.target.value);
        setPrice(tmp);
        props.update(props.id,tmp);
    }

    const d = () => {
        props.del(props.id);
    }

    return (
        <div>
            <label>Prices:</label>
            <input onInput={set}></input>
            <button onClick={d}>x</button>
        </div>
    )
}

export default Price;