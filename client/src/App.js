import './App.css';
import {useState, useEffect} from 'react';
import Animals from './components/Animals';
import SightingsForm from "./components/SightingsForm";

function App() {

  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/sightings")
    .then((response) => response.json())
    .then(sightings =>{
      setSightings(sightings)      
    })
    
  }, []);

  const addSightings = (newSightings) => {
    console.log(newSightings);
    //postSpecies(newSpecies);
    setSightings((sightings) => [...sightings, newSightings]);
  };

  return (
    <div className="App">
    <h1>Your Favorite Location for Rare Sightings</h1>
    <h2> Tell Awll Here </h2>
        <SightingsForm addSightings={addSightings}/>
        <ol>
          {sightings.map(sight =>
            <li key={sight.id}> {sight.datetimeofsighting} {sight.individualseen} {sight.sightinglocation} {sight.healthycondition} {sight.emailaddress} {sight.recordcreation}</li>)}
        </ol>
      <Animals />
    </div>
  );
}

export default App;
