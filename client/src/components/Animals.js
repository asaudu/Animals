import { useState, useEffect } from "react";
//import Form from "./form";

function Animals() {

    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/animals")
        .then((response) => response.json())
        .then(animals =>{
            setAnimals(animals)      
        })
        
    }, []);

    

    // const addStudent = (newStudent) => {
    //     //console.log(newStudent);
    //     //postStudent(newStudent);
    //     setStudents((students) => [...students, newStudent]);
    // }


    return (
      <div className="animals">
        <h2> List of Animals </h2>
        <ul>
            {animals.map(animal =>
                <li key={animal.id}> {animal.commonname} {animal.scientificname} {animal.numberinthewild}</li>)}
        </ul>
        {/* <Form addStudent={addStudent} /> */}
      </div>
    );
  }
  
  export default Animals;