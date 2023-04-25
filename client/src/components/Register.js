import React from 'react'

const Register = () => {
    return (
        <div className="text-center m-5">
            <h2 className='authentication-h2'>Kayıt Ol</h2>
            <form className='authentication-form'>
                <p>
                    <label className='authentication-label'>Kullanıcı Adı</label><br />
                    <input className='authentication-input' type="text" name="first_name" required />
                </p>
                <p>
                    <label className='authentication-label'>E-Posta adresi</label><br />
                    <input className='authentication-input' type="email" name="email" required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label><br />
                    <input className='authentication-input' type="password" name="password" requiredc />
                </p>
                <p>
                    <button  className='authentication-button' id="sub_btn" type="submit">Kayıt Ol</button>
                </p>
            </form>
        </div>
    )
}

export default Register