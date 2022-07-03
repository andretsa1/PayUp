import Price from "./Price"
import  React, { useState } from 'react';

function Person(props) {
    const [prices, setPrices] = useState({});
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    console.log(prices)
    const update = (id,res) => {
        // var copy = JSON.parse(JSON.stringify(prices));
        prices[id] = res;
        // setPrices(copy);
        calculate();
    }

    const add = () => {
        var copy = JSON.parse(JSON.stringify(prices));
        copy[count] = 0;
        setPrices(copy);
        setCount(count+1);
    }

    const calculate = () => {
        let tmp = 0;
        for (const k in prices){
            tmp+=prices[k];
        }
        setTotal(tmp);
        props.calcTotal(props.id,tmp);
    }

    const del = (key) => {
        // var copy = JSON.parse(JSON.stringify(prices));
        delete prices[key];
        // setPrices(copy);
        calculate();
    }

    return (
        <div className="App">

            <button onClick={()=>props.del(props.id)}>remove</button>
            <button onClick={add}>Add</button>
            {Object.keys(prices).map((k) =>
                <div>
                    <Price key={k} id={k} update={update} del={del}/>
                </div>
            )}

            <div>
                <p>SubTotal: {Math.round(total*1000)/1000}</p>
            </div>
        </div>
    );
}

export default Person;