import { useState, useEffect } from "react";
import SpecifiesForm from "./SpeciesForm";

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


    return (
      <div className="animals">
        <h2> List of Animals </h2>
        <ul>
            {species.map(specie =>
                <li key={specie.id}> {specie.commonname} {specie.scientificname} {specie.numberinthewild}</li>)}
        </ul>
        <SpecifiesForm addSpecies={addSpecies} />
      </div>
    );
  }
  
  export default Animals;