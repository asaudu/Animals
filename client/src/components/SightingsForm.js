import {useState} from 'react';

const SightingsForm = (props) => {

    const [sightings, setSightings] = useState({
        dateandtimeofsighting: "",
        individualseen: "",
        sightinglocation: "",
        healthycondition: "",
        emailaddress: "",
        recordcreation: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleDateTimeSightingChange = (event) => {
        const dateandtimeofsighting = event.target.value;
        setSightings((sightings) => ({ ...sightings, dateandtimeofsighting }));

    }

    const handleIndividualSeenChange = (event) => {
        const individualseen = event.target.value;
        setSightings((sightings) => ({ ...sightings, individualseen }));

    }

    const handleNumberInTheWildChange = (event) => {
        const sightinglocation = event.target.value;
        setSightings((sightings) => ({ ...sightings, sightinglocation }));

    }

    const handleSightingLocationChange = (event) => {
        const sightinglocation = event.target.value;
        setSightings((sightings) => ({ ...sightings, sightinglocation }));

    }

    const handleHealthyConditionChange = (event) => {
        const healthycondition = event.target.value;
        setSightings((sightings) => ({ ...sightings, healthycondition }));

    }

    const handleEmailChange = (event) => {
        const emailaddress = event.target.value;
        setSightings((sightings) => ({ ...sightings, emailaddress }));

    }

    const handleRecordCreationChange = (event) => {
        const recordcreation = event.target.value;
        setSightings((sightings) => ({ ...sightings, recordcreation }));

    }

    //A function to handle the post request
    const postSightings = (newSpecies) => {
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
        let emptySightings = {
            dateandtimeofsighting: "",
            individualseen: "",
            sightinglocation: "",
            healthycondition: "",
            emailaddress: "",
            recordcreation: ""
        }
        e.preventDefault();
        setSightings(sightings);
        postSightings(sightings);
        props.addSightings(sightings);
        setSightings(emptySightings);     
    };


    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>Date/Time of Sighting</label>
                <input
                    type="text"
                    //id="add-common-name"
                    placeholder="Sighting Time"
                    required
                    value={sightings.dateandtimeofsighting}
                    onChange={handleDateTimeSightingChange}

                /> <br/>
                <label>Individual Seen</label>
                <input
                    type="text"
                    //id="add-scientific-name"
                    placeholder="Individual Seen"
                    required
                    value={sightings.individualseen}
                    onChange={handleIndividualSeenChange}
                /> <br/>
                <label>Sighting Location</label>
                <input
                    type="number"
                    //id="add-numbers-in-the-wild"
                    placeholder="Sighting Location"
                    required
                    value={sightings.sightinglocation}
                    onChange={handleSightingLocationChange}
                /> <br/>
                <label>Healthy Condition</label>
                <input
                    type="number"
                    //id="add-numbers-in-the-wild"
                    placeholder="Healthy Condition"
                    required
                    value={sightings.healthycondition}
                    onChange={handleHealthyConditionChange}
                /> <br/>
                <label>Email Address</label>
                <input
                    type="text"
                    //id="conservation-status-code"
                    placeholder="Email Here"
                    required
                    value={sightings.emailaddress}
                    onChange={handleEmailChange}
                /> <br/>
                <label>Record Creation Timestamp</label>
                <input
                    type="datetime-local"
                    //id="record-creation-timestamp"
                    placeholder="Record Timestamp"
                    required
                    value={sightings.recordcreation}
                    onChange={handleRecordCreationChange}
                /> <br/> <br/>
                <button type="submit">Add</button>

            </fieldset>
            
        </form>
    );
};

export default SightingsForm;