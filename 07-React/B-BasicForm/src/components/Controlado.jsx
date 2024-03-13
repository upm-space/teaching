import { useState } from "react";

const Controlado = () => {
    const [title,setTitle] = useState('titulo 1');
    const [description,setDescription] = useState('descripción1');
    const [state,setState] = useState('pendiente');

    const handleSubmit = (e) => {
        e.preventDefault();    

    }
    
    return(
    <form onSubmit={(e) => handleSubmit(e)} >
        <input name="title" type="text" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea name="description" className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
        <select name="state" className="form-select mb-2" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
        </select>
        <button type="submit" className="btn btn-primary">Procesar</button>
    </form>
)}
export default Controlado
