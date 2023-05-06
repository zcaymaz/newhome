import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const [user, setUser] = useState({businessname: "", email: "", password: "", gsmno: "", vkn: ""})
    const navigator = useHistory()
  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUser({...user, [name]: value})
    }
  
    const handleSubmit = async () => {
      console.log(user);
      const res = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      if(res.ok){
        navigator("/login");
      }else{
        console.log(data);
      }
    }
    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Kayıt Ol</h2>
            <form className='authentication-form'>
                <p>
                    <label className='authentication-label'>İşletme Adı</label><br />
                    <input className='authentication-input' type="text" name="businessname" onChange={handleChange} required />
                </p>
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="email" name="email" onChange={handleChange} required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label><br />
                    <input className='authentication-input' type="password" name="password" onChange={handleChange} requiredc />
                </p>
                <p>
                    <label className='authentication-label'>Telefon</label><br />
                    <input className='authentication-input' type="number" name="gsmno" onChange={handleChange} requiredc />
                </p>
                <p>
                    <label className='authentication-label'>Vergi Kimlik No</label><br />
                    <input className='authentication-input' type="number" name="vkn" onChange={handleChange} requiredc />
                </p>
                <p>
                    <button  className='authentication-button' id="sub_btn" type="submit" onClick={handleSubmit} >Kayıt Ol</button>
                </p>
            </form>
        </div>
    )
}

export default Register