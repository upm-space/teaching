import { useState } from "react";
import FormItem from "./FormItem";

const Controlado = () => {
    const [title,setTitle] = useState('titulo 1');
    const [description,setDescription] = useState('descripción1');
    const [state,setState] = useState('pendiente');
    const [items,setItems] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();    
        const _item = {title, description, state};
        //setItems(prevItems => [...prevItems, _item]); //Cuidado con esto. dificil de explicar    
        const _items = [...items,_item]
        setItems(_items)    
    }
    
    const handleDelete = (indexToDelete) => {
        setItems(prevItems => prevItems.filter((item, index) => index !== indexToDelete));
    };
    
    
    return(
    <> 
    {
        items.map((item, index) => 
        <FormItem 
            key={index} 
            title={item.title} 
            description={item.description} 
            state={item.state} 
            onDelete={() => handleDelete(index)} 
        />
        )
    }   
    <form onSubmit={(e) => handleSubmit(e)} >
        <input name="title" type="text" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea name="description" className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
        <select name="state" className="form-select mb-2" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
        </select>
        <button type="submit" className="btn btn-primary">Procesar</button>
    </form>
    </>
)}
export default Controlado
