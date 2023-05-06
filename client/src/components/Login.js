import React from 'react'


const Login = () => {

    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Giriş Yap</h2>
            <form className='authentication-form' action="/home">
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="text" name="email" required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label>
                    <br />
                    <input className='authentication-input' type="password" name="password" required />
                </p>
                <p>
                    <button className="authentication-button" type="submit" >Giriş</button>
                </p>
            </form>
        </div>
    )
}

export default Login