import React, {useState} from 'react'
import axios from 'axios'

const Login = () => {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            axios.post('http://localhost:3001/user/login', {...user}).then((res)=> {
                localStorage.setItem('role', res.data.role)
                window.location.href = "/";
            })
            localStorage.setItem('firstLogin', true)
            localStorage.setItem('email', user.email)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Giriş Yap</h2>
            <form className='authentication-form' action="/home" onSubmit={loginSubmit}>
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="text" name="email" required onChange={onChangeInput} />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label>
                    <br />
                    <input className='authentication-input' type="password" name="password" required onChange={onChangeInput} />
                </p>
                <p>
                    <button className="authentication-button" type="submit" >Giriş</button>
                </p>
            </form>
        </div>
    )
}

export default Login