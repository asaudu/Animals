import { useState } from "react";


const SpecifiesForm = (props) => {

    const [species, setSpecies] = useState({
        commonname: "",
        scientificname: "",
        numbersinthewild: "",
        conservationstatuscode: "",
        recordcreation: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleCommonNameChange = (event) => {
        const commonname = event.target.value;
        setSpecies((species) => ({ ...species, commonname }));

    }

    const handleScientificNameChange = (event) => {
        const scientificname = event.target.value;
        setSpecies((species) => ({ ...species, scientificname }));

    }

    const handleNumberInTheWildChange = (event) => {
        const numberinthewild = event.target.value;
        setSpecies((species) => ({ ...species, numberinthewild }));

    }

    const handleConservationStatusCodeChange = (event) => {
        const conservationstatuscode = event.target.value;
        setSpecies((species) => ({ ...species, conservationstatuscode }));

    }

    const handleRecordCreationChange = (event) => {
        const recordcreation = event.target.value;
        setSpecies((species) => ({ ...species, recordcreation }));

    }

    //A function to handle the post request
    const postSpecies = (newSpecies) => {
        return fetch('http://localhost:8080/api/species', {
        //must define the method you want to use
        method: 'POST',
        //let's you know what format the content will come in
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newSpecies)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addSpecies(data);
      
    });
    }

    const handleSubmit = (e) => {
        //can insert a variable of empty strings to equal the cleared fields once submitted
        let emptySpecies = {
            commonname: "",
            scientificname: "",
            numbersinthewild: "",
            conservationstatuscode: "",
            recordcreation: ""
        }
        e.preventDefault();
        setSpecies(species);
        postSpecies(species);
        props.addSpecies(species);
        setSpecies(emptySpecies);     
    };


    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>Common Name</label>
                <input
                    type="text"
                    id="add-common-name"
                    placeholder="First Name"
                    required
                    value={species.commonname}
                    onChange={handleCommonNameChange}

                /> <br/>
                <label>Scientific Name</label>
                <input
                    type="text"
                    id="add-scientific-name"
                    placeholder="Scientific Name"
                    required
                    value={species.scientificname}
                    onChange={handleScientificNameChange}
                /> <br/>
                <label>Numbers in the Wild</label>
                <input
                    type="number"
                    id="add-numbers-in-the-wild"
                    placeholder="Numbers in the wild"
                    required
                    value={species.numberinthewild}
                    onChange={handleNumberInTheWildChange}
                /> <br/>
                <label>Conservation Status Code</label>
                <input
                    type="text"
                    id="conservation-status-code"
                    placeholder="Conservation Code"
                    required
                    value={species.conservationstatuscode}
                    onChange={handleConservationStatusCodeChange}
                /> <br/>
                <label>Record Creation Timestamp</label>
                <input
                    type="datetime-local"
                    id="record-creation-timestamp"
                    placeholder="Record Timestamp"
                    required
                    value={species.recordcreation}
                    onChange={handleRecordCreationChange}
                /> <br/> <br/>
                <button type="submit">Add</button>

            </fieldset>
            
        </form>
    );
};

export default SpecifiesForm;