import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {LogInContext, UserContext} from '../Helper/Context'


const API = process.env.REACT_APP_API;

export const LogIn = () => {

    const {LoggedIn,setLoggedIn} = useContext(LogInContext)
    const {UserG,setUserG} = useContext(UserContext)

    let history = useHistory();

    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')

    const [incorrecto,setIncorrecto] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email)
        console.log(password)
        

        const res = await fetch(`${API}/userA/${email}`)
        const data = await res.json();
        //console.log(data)

        if(data.password === password){
            
            console.log("Correcto");
            setLoggedIn(true)
            setUserG(data._id)
            console.log(UserG)
            history.push("/Inicio")

        }else{
            console.log("Incorrecto")
            setEmail('')
            setPassword('')
            setIncorrecto(true)
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div><h1>Ingresa tus datos</h1><br></br></div>
                    <div className="form-group">
                        <div>Email:</div>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className="form-control" 
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <div>Contraseña:</div>
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            className="form-control" 
                            placeholder="Password"
                        />
                    </div>
                    <div>{incorrecto ? 'El correo o la contraseña son incorrectos' : ''}</div>
                    <button className="btn btn-primary btn-block">
                        Ingresar
                    </button>
                </form>
            </div>
            <div>
                {LoggedIn ? <h1>Estas Logeado</h1>: <h1>No estas logeado</h1>}
            </div>
        </div>
        
            
    )
}