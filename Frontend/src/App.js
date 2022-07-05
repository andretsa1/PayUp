import './App.css';
import  React, { useState, useEffect, useRef } from 'react';
import Person from "./Person";

function App() {
    const [people, setPeople] = useState({});
    const [actualTotal, setActualTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const factor = useRef(1);
    const inputMap = useRef({});
    const autoScroll = useRef(null);

    useEffect(() => autoScroll.current.scrollIntoView(),[count]);

    const changeMap = (id,key,val,bool) => {
        if (bool){
            delete inputMap.current[id][key];
        }
        else {
            inputMap.current[id][key] = val;
        }
    }

    const calculate = () => {
        if (actualTotal < total) {
            alert("The total with tip and tax has to be larger than subtotal!");
            return;
        }
        let temp = 0;
        for (const k in people){
            temp+=parseFloat(people[k]);
        }
        setTotal(total);
        factor.current = actualTotal/temp;
        update();
    }

    const update = () => {
        var copy = JSON.parse(JSON.stringify(people));
        setPeople(copy);
    }

    const add = () => {
        let copy = Object.assign({},people);
        copy[count] = JSON.stringify(0);
        setPeople(copy);
        inputMap.current[count] = ({count: 0});
        setCount(count+1);
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

    const countPeople = () => {
        let personCount = 1;
        return (Object.keys(people).map((k) =>
            <p>Person {personCount++}</p>
        ))
    }

    return (
        <div className="App">
            <div id="head">
                <h1 id = "Pay">Pay<span id = "Up">Up</span></h1>
            </div>
            <div id = "Bar">
                {countPeople()}
                <button ref={autoScroll} id ="AddPerson" onClick={add}>Add New Person</button>
            </div>
            <div id="peoples">
                {Object.keys(people).map((k) =>
                    <div className={"Input"}>
                        <Person key={k} id={k} del={del} input={inputMap.current} changeInput = {changeMap} calcTotal={calcTotal}/>
                        <p>Amount Due: {Math.round(parseFloat(people[k])*(factor.current)*1000)/1000}</p>
                    </div>
                )}
            </div>

            <div>
                {/* <p>Total: {Math.round(total*1000)/1000}</p> */}
                <label id="total">Total: </label>
                <input onChange={totalWithTipTax} placeholder="including tip and tax" type="number"></input>
            </div>
            <div>
                <button id="calculatebutton" onClick={calculate}>Calculate</button>
            </div>
        </div>
    );
}

export default App;
