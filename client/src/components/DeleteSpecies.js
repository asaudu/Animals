import {useState} from 'react';

const DeleteSpecies = ({deleteSpecies}) => {

    const [deleteId, setDeleteId] = useState('');

    return(
        <div>
            <h3>Delete Species by ID</h3>
            <form id="" action="#" onSubmit={(e) => {e.preventDefault(); deleteSpecies(deleteId); setDeleteId('') }}>
                <fieldset>
                    <label>Species ID</label>
                    <input type="text" id="" onChange={(e) => {setDeleteId(e.target.value)}}/>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default DeleteSpecies;