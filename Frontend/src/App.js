import './App.css';
import  React, { useState, useRef } from 'react';
import Person from "./Person";

function App() {
    const [people, setPeople] = useState({});
    const [actualTotal, setActualTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const count = useRef(0);
    const factor = useRef(1);
    const inputMap = useRef({});

    const changeMap = (id,key,val,bool) => {
        if (bool){
            delete inputMap.current[id][key];
        }
        else {
            inputMap.current[id][key] = val;
        }
    }

    const calculate = () => {
        let total = 0;
        for (const k in people){
            total+=parseFloat(people[k]);
        }
        setTotal(total);
        factor.current = actualTotal/total;
    }

    // const update = (id,res) => {
    //     var copy = JSON.parse(JSON.stringify(people));
    //     copy[id] = res;
    //     setPeople(copy);
    // }

    const add = () => {
        let copy = Object.assign({},people);
        copy[count.current] = JSON.stringify(0);
        setPeople(copy);
        inputMap.current[count.current] = ({count: 0});
        count.current+=1;
    }

    const del = (key) => {
        let copy = Object.assign({},people)
        delete copy[key];
        setPeople(copy);
        delete inputMap.current[key];
    }

    const totalWithTipTax = (event) => {
        setActualTotal(event.target.value);
    }

    const calcTotal = (key,subtotal) => {
        let copy = JSON.parse(JSON.stringify(people));
        copy[key] = subtotal;
        setPeople(copy);
    }

    return (
        <div className="App">
            <h1 id = "Pay">Pay<span id = "Up">Up</span></h1>

            <button onClick={add}>Add New Person</button>

            <div id="peoples">
                {Object.keys(people).map((k) =>
                    <div>
                        <Person key={k} id={k} del={del} input={inputMap.current} changeInput = {changeMap} calcTotal={calcTotal}/>
                        <p>To Pay: {Math.round(parseFloat(people[k])*(factor.current)*1000)/1000}</p>
                    </div>
                )}
            </div>

            <div>
                <p>Total: {Math.round(total*1000)/1000}</p>
                <label>Total with Tip and Tax: </label>
                <input onChange={totalWithTipTax}></input>
                <button onClick={calculate}>Calculate</button>
            </div>
        </div>
    );
}

export default App;
