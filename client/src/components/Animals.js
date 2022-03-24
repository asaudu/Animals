import { useState, useEffect } from "react";
import SpeciesForm from "./SpeciesForm";
import DeleteSpecies from "./DeleteSpecies";
import SightingsForm from "./SightingsForm";

function Animals() {

    const [species, setSpecies] = useState([]);

    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/species")
        .then((response) => response.json())
        .then(species =>{
          setSpecies(species)      
        })
        
    }, []);

    useEffect(() => {
      fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then(sightings =>{
        setSpecies(sightings)      
      })
      
    }, []);

    const addSpecies = (newSpecies) => {
      console.log(newSpecies);
      //postSpecies(newSpecies);
      setSpecies((species) => [...species, newSpecies]);
    };

    const addSightings = (newSightings) => {
      console.log(newSightings);
      //postSpecies(newSpecies);
      setSightings((sightings) => [...sightings, newSightings]);
    };

    const deleteSpecies = (deleteId) => {
      const newSpecies = species.filter((i) => i.id !== deleteId);
      setSpecies(newSpecies);
      fetch('http://localhost:8080/api/species', {
        method: 'DELETE'
      }
     )
    };

    return (
      <div className="animals">
        <h2> List of Sightings </h2>
        <SightingsForm addSightings={addSightings}/>
        <ol>
          {sightings.map(sight =>
            <li key={sight.id}> {sight.datetimeofsighting} {sight.individualseen} {sight.sightinglocation} {sight.healthycondition} {sight.emailaddress} {sight.recordcreation}</li>)}
        </ol>
        
        <h2> List of Animals </h2>
        <ol>
            {species.map(specie =>
                <li key={specie.id}> <strong>ID:</strong> {specie.id} <strong>Species:</strong> {specie.commonname} <strong>Scientific Name:</strong> {specie.scientificname} <strong>Numbers in the Wild:</strong> {specie.numberinthewild}</li>)}
        </ol>
        <SpeciesForm addSpecies={addSpecies} />
        <DeleteSpecies deleteSpecies={deleteSpecies}/>
      </div>
    );
  }
  
  export default Animals;