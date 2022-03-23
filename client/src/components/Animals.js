import { useState, useEffect } from "react";
import SpecifiesForm from "./SpeciesForm";
import DeleteSpecies from "./DeleteSpecies";

function Animals() {

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/species")
        .then((response) => response.json())
        .then(species =>{
          setSpecies(species)      
        })
        
    }, []);

    

    const addSpecies = (newSpecies) => {
        console.log(newSpecies);
        //postSpecies(newSpecies);
        setSpecies((species) => [...species, newSpecies]);
    }

    const deleteSpecies = (deleteId) => {
      const newSpecies = species.filter((i) => i.id !== parseInt(deleteId));
      setSpecies(newSpecies);
      fetch('http://localhost:8080/api/species' + deleteId, {
          method: 'DELETE'
      }
     )
  }

    return (
      <div className="animals">
        <h2> List of Animals </h2>
        <ul>
            {species.map(specie =>
                <li key={specie.id}> <strong>ID:</strong> {specie.id} <strong>Species:</strong> {specie.commonname} <strong>Scientific Name:</strong> {specie.scientificname} <strong>Numbers in the Wild:</strong> {specie.numberinthewild}</li>)}
        </ul>
        <SpecifiesForm addSpecies={addSpecies} />
        <DeleteSpecies deleteSpecies={deleteSpecies}/>
      </div>
    );
  }
  
  export default Animals;