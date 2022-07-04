import Price from "./Price"
import  React, { useState, useEffect } from 'react';
import './Person.css';
function Person(props) {
    const [prices, setPrices] = useState({});
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>calculate(),[prices,total]);

    const update = (id,res) => {
        var copy = JSON.parse(JSON.stringify(prices));
        copy[id] = res;
        setPrices(copy);
        props.changeInput(props.id,id,res,false);
    }

    const add = () => {
        var copy = Object.assign({},prices);
        copy[count] = 0;
        setPrices(copy);
        setCount(count+1);
        props.input[props.id].count = count+1;
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
        var copy = JSON.parse(JSON.stringify(prices));
        delete copy[key];
        setPrices(copy);
        props.changeInput(props.id,key,-1,true);
    }

    const check = () => {
        if (Object.keys(prices).length == 0 && Object.keys(props.input[props.id]).length != 1){
            let copy = Object.assign({},props.input[props.id]);
            delete copy.count;
            setPrices(copy);
            setCount(props.input[props.id].count);
        }
    }

    return (
        <div className="Person">
            <button className = "Prices" onClick={add}>Add</button>
            <button className = "Prices" onClick={()=>props.del(props.id)}>Remove</button>
            {check()}
            {(Object.keys(prices).map((k) =>
                <div>
                    <Price key={k} id={k} update={update} del={del} value={props.input[props.id][k]}/>
                </div>
            ))}

            <div>
                <p>SubTotal: {Math.round(total*1000)/1000}</p>
            </div>
        </div>
    );
}

export default Person;