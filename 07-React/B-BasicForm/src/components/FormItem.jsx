const FormItem = ({ title, description, state, onDelete }) => {
    return(
        <div className="row align-items-center">
            <div className="col">
                <h1>{title}</h1>
            </div>
            <div className="col">
                <p>{description}</p>
            </div>
            <div className="col">
                <p>{state}</p>
            </div>
            <div className="col text-end">
                <button onClick={onDelete} className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    );
}

export default FormItem