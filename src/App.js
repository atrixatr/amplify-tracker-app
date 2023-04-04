import logo from './logo.svg';
import './App.css';
import  { Amplify, API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import awsconfig from './aws-exports';



//import React, { useState } from 'react'
import Hotbar from './hotbar';
import About from './about';
import LoginPage from './LoginPage';
import MembershipPage from './MembershipPage';
import HomePage from './HomePage';
import MakeListPage from './makeList';
import SoonPage from './soonPage';
import { BrowserRouter as Router, Routes, Route, Switch} from 'react-router-dom';
import axios from 'axios';

// todo: change api
const myAPI = "api1dc1e643"
const path = '/customer';
Amplify.configure(awsconfig);
API.configure(awsconfig);
//Main Function

function App() {



  const [myMessage, setMyMessage] = useState('')

  const loadData = async () => {
    const response = await axios.get("http://localhost:3000/search");
    setMyMessage(response.myMessage);
  }

  useEffect(() => {
    loadData()
  },[])

  console.log("Message is" + myMessage);
  console.log("In app.js");

  return (
    <Router>
      <div className="App">
        <Hotbar />
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/membership" element={<MembershipPage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path = "/makeList" element = {<MakeListPage/>} />
          <Route path = "/soonPage" element = {<SoonPage/>} />
        </Routes>

        
        <p>hi {myMessage} hi</p>

      </div>
    </Router>
  );
}

export default App;

/*



const App = () => {
    const [input, setInput] = useState("")
    const [customers, setCustomers] = useState([])

    //Function to fetch from our backend and update customers array
    function getCustomer(e) {
        console.log(customers)
        let customerId = e.input
        console.log(e.input)
        API.get(myAPI, path + "/" + customerId)
            .then(response => {
                console.log("hi")
                console.log(response)
                let newCustomers = [...customers]
                newCustomers.push(response)
                setCustomers(newCustomers)

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (

        <div className="App">
            <h1>Super Simple React App</h1>
            <div>
                <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
            <br/>
            <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

            <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
            {
                customers.map((thisCustomer, index) => {
                    return (
                        <div key={thisCustomer.customerId}>
                            <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
                        </div>)
                })
            }
        </div>
    )
}

export default App;*/
