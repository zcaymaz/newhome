import React, {useState} from 'react'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    businessname: '', email: '', password: '', gsmno: '', vkn: ''
  })

  const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const registerSubmit = async e =>{
    e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
  }
    
    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Kayıt Ol</h2>
            <form className='authentication-form' onSubmit={registerSubmit}>
                <p>
                    <label className='authentication-label'>İşletme Adı</label><br />
                    <input className='authentication-input' type="text" value={user.businessname} name="businessname" onChange={onChangeInput}  required />
                </p>
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="email" value={user.email} name="email" onChange={onChangeInput}  required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label><br />
                    <input className='authentication-input' type="password" value={user.password}  name="password" onChange={onChangeInput}  required />
                </p>
                <p>
                    <label className='authentication-label'>Telefon</label><br />
                    <input className='authentication-input' type="number" value={user.gsmno} name="gsmno" onChange={onChangeInput}  required/>
                </p>
                <p>
                    <label className='authentication-label'>Vergi Kimlik No</label><br />
                    <input className='authentication-input' type="number" value={user.vkn} name="vkn" onChange={onChangeInput}  required />
                </p>
                <p>
                    <button  className='authentication-button' id="sub_btn" type="submit" >Kayıt Ol</button>
                </p>
            </form>
        </div>
    )
}

export default Register