import React, {useState, useEffect} from 'react'
//import {LogInContext, UserContext} from '../Helper/Context'
//import {useHistory} from 'react-router-dom'


const API = process.env.REACT_APP_API;

export const Inicio = () => {

    //const {LoggedIn,setLoggedIn} = useContext(LogInContext)
    //const {UserG,setUserG} = useContext(UserContext)

    //let history = useHistory();

    const  [user_id, setUser_id] = useState('')
    const  [titulo, setTitulo] = useState('')
    const  [contenido, setContenido] = useState('')
    const  [fechaFinal, setFechaFinal] = useState('')
    const  [fechaInicio, setFechaInicio] = useState('')
    

    const [editing,setEdit] = useState(false)
    const [id,setId] = useState('')

    const [polls, setPolls] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!editing){
            //Fecha
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            if(month < 10){
                setFechaInicio(`${day}-0${month}-${year}`)
            }else{
                setFechaInicio(`${day}-${month}-${year}`)
            }
            //Crear encuesta
            const res = await fetch(`${API}/polls`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   user_id,
                    titulo,
                    contenido,
                    fechaInicio,
                    fechaFinal
                })
            })
            const data = await res.json();
            console.log(data)
        } else {
            const res = await fetch(`${API}/polls/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id,titulo, contenido, fechaInicio,fechaFinal
                })
            })
            const data = await res.json();
            console.log(data)

            setEdit(false);
            setId('');
        }
        

        await getPolls();

        setUser_id('')
        setTitulo('')
        setContenido('')
        setFechaInicio('')
        setFechaFinal('')
    }

    const getPolls = async () => {
        const res = await fetch(`${API}/polls`)
        const data = await res.json();
        setPolls(data)

    }

    useEffect(() => {
        getPolls();
    },[])


    const editPoll = async (id) => {
        const res = await fetch(`${API}/poll/${id}`)
        const data = await res.json();
        //console.log(data)

        setEdit(true);
        setId(id);
        
        setUser_id(data.user_id)
        setTitulo(data.titulo)
        setContenido(data.contenido)
        setFechaFinal(data.fechaFinal)
    }

    const deletePoll = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if(userResponse){
            const res = await fetch(`${API}/polls/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data)
            await getPolls();
        }

    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div><h1>Crear encuesta</h1></div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={e => setUser_id(e.target.value)} 
                            value={user_id} 
                            className="form-control" 
                            placeholder="Creador" 
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <div>Titulo:</div>
                        <input 
                            type="text" 
                            onChange={e => setTitulo(e.target.value)} 
                            value={titulo} 
                            className="form-control" 
                            placeholder="Titulo" 
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <div>Contenido:</div>
                        <input 
                            type="text" 
                            onChange={e => setContenido(e.target.value)} 
                            value={contenido} 
                            className="form-control" 
                            placeholder="Contenido"
                        />
                    </div>
                    <div className="form-group">
                        <div>Fecha Final:</div>
                        <input 
                            type="date" 
                            onChange={e => setFechaFinal(e.target.value)} 
                            value={fechaFinal} 
                            className="form-control" 
                            placeholder="Fecha Final"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Creador</th>
                            <th>Titulo</th>
                            <th>Contenido</th>
                            <th>Fecha Creacion</th>
                            <th>Fecha Final</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {polls.map(poll => (
                    <tr key={poll._id}>
                        <td>{poll.user_id}</td>
                        <td>{poll.titulo}</td>
                        <td>{poll.contenido}</td>
                        <td>{poll.fechaInicio}</td>
                        <td>{poll.fechaFinal}</td>
                        <td>
                            <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick ={e => editPoll(poll._id)}
                            >
                                Edit
                            </button>
                            <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick ={() => deletePoll(poll._id)}
                            >
                                Delete
                            </button>
                            <button 
                                className="btn btn-danger btn-sm btn-block"
                                //onClick ={()}
                            >
                                Responder
                            </button>
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </div>
            
    )
    

 
}
