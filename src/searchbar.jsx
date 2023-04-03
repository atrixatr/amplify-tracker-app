import React, { useState } from 'react';
import items from './data-list';
import items2 from './data-users';

import './searchBar.css';
import {API} from "aws-amplify";

const all_Items = [...new Set(items.map((item) => item.category))]
const all_Items2 = [...new Set(items2.map((item2) => item2.category))]


const Team = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((memberInfo) => {
        const { LocationListID, LocationListName, LocationName, LocationListDescription, LocationID, UserID} = memberInfo

        return (

          <article key={LocationListID}
          className="member-section">

            <div className="lists-info">
              <header>
                <h3>
                  Location List name: {LocationListName}
                </h3>
                <h4 className="location-name">
                  Location Name: {LocationName}
                </h4>
              </header>
              <p className="location-list-desc">
                {LocationListDescription}
              </p>
              <h4 className="location-id">
                  Location ID: {LocationID}
                </h4>
                <h4 className="user-id">
                  User ID: {UserID}
                </h4>

            </div>

          </article>

              )
            })
           }
    </div>
  )
}

const Users = ({ items2 }) => {
  return (
    <div className="section-center">
      {items2.map((UsersInfo) => {
        const { UserID, Username, Name, Email, Password, isPublic} = UsersInfo

        return (

          <article key={UserID}
          className="member-section">

            <div className="users-info">
              <header>
                <h3>
                  Username: {Username}
                </h3>
                <h4 className="users-name">
                  Name: {Name}
                </h4>
              </header>
              <p className="users-email">
                {Email}
              </p>
              <h4 className="users-password">
                  Password: {Password}
                </h4>
                <h4 className="user-public">
                  isPublic: {isPublic}
                </h4>

            </div>

          </article>

              )
            })
           }
    </div>
  )
}

function SearchBar() {
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParamValue, setSelectedParamValue] = useState('');

  const [memberInfos] = useState(items)
  const [UsersInfos] = useState(items2)
  console.log("This is line 101 of searchbar.jsx");


  const handleChangeParam1 = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected parameter 1: ${selectedValue}`);
    setParam1(selectedValue);
  console.log("This is line 108 of searchbar.jsx");



    if(selectedValue == 'value1') {
      console.log(`List selected`);
      setSelectedParamValue(<Team items={memberInfos} />);

    } else if(selectedValue == 'value2') {
      console.log(`User selected:`);
      setSelectedParamValue(<Users items2={UsersInfos} />);
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if(param1 == 'value1' && searchTerm){
    //   console.log(`Search term: ${searchTerm}`);
    //   setSelectedParamValue(<Team items={memberInfos.filter(memberInfo => memberInfo.LocationListName.includes(searchTerm))} />);
    //   console.log("this is line 127 of searchbar.jsx");
    // }
    // else if(param1 == 'value2' && searchTerm){
    //   console.log(`Search term: ${searchTerm}`);
    //   setSelectedParamValue(<Users items2={UsersInfos.filter(UsersInfo => UsersInfo.Username.includes(searchTerm))} />)
    //   console.log("This is line 132 of searchbar.jsx");
    // }
    let myAPI = "85g81w4tm2";
    API.get(myAPI,"search/" + searchTerm)
    .then(res => {
        console.log(res);
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });



    // perform search using selected parameters and search term
    // ...
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="param1">Search by Type:</label>
      <select id="param1" name="param1" value={param1} onChange={handleChangeParam1}>
        <option value="">-- Select search type --</option>
        <option value="value1">List Name</option>
        <option value="value2">User</option>
      </select>

      <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

        <button type="submit">Search</button>
      </form>

      {selectedParamValue && (
        <div>{selectedParamValue}</div>
      )}
    </div>
  );
}

export default SearchBar;
