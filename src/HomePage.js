import React, { useState } from 'react'
import SearchBar from './searchbar';


import { Link } from 'react-router-dom';

        
function HomePage() {


  return (
    <main>
      <br></br>
      


      <section className="ListItems section">
        <h3>Select an item in the Search bar to get started</h3>
        <h4>You can search by List Name or Username</h4>
      <SearchBar />
        
      </section>

    </main>
  )
}


export default HomePage;
