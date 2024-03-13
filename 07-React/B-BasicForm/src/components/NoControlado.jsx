import { useRef } from "react";

const NoControlado = () => {

    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        console.log(...data) 
        const dataObject = Object.fromEntries([...data.entries()])
        console.log(dataObject);       

    }
    
    return(
    <form onSubmit={(e) => handleSubmit(e)} ref={form}>
        <input name="title" type="text" defaultValue="Meter título" className="form-control mb-2" />
        <textarea name="description" className="form-control mb-2" defaultValue="Introduzca descripción"></textarea>
        <select name="state" className="form-select mb-2" defaultValue="completado">
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
        </select>
        <button type="submit" className="btn btn-primary">Procesar</button>
    </form>
)}
export default NoControlado
