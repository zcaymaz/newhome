import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../App'


const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const navigator = useHistory()
    const { setRefresh } = useContext(AuthContext);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(user);
        const res = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("token", data.token);
            alert('Giriş Yapıldı')
            setRefresh(true)
            return navigator("/");
        } else {
            console.log("kandırdılar");
        }
    }
    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Giriş Yap</h2>
            <form className='authentication-form' action="/home">
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="text" name="email" onChange={handleChange} required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label>
                    <br />
                    <input className='authentication-input' type="password" name="password" onChange={handleChange} required />
                </p>
                <p>
                    <button className="authentication-button" type="submit" onClick={handleSubmit} >Giriş</button>
                </p>
            </form>
        </div>
    )
}

export default Login