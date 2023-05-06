import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import Logo from "./logonavbar.png"

const Header = () => {
    const isLogged = localStorage.getItem('role') ? true : false
    const isAdmin = localStorage.getItem('role') === '1' ? true : false
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('http://localhost:3001/user/logout')

        localStorage.clear()

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li className="nav-item"><Link className="nav-link" to="/">Ana Sayfa</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/market">İlanlar</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">Projeler</Link></li>
                <li><Link to="/create_product">Ürün Ekle</Link></li>
                <li><Link to="/category">Kategoriler</Link></li>
                <li><Link to="/" onClick={logoutUser}>Çıkış Yap</Link></li>
            </>
        )
    }

    const nobreminadminRouter = () => {
        return (
            <>
                <li className="nav-item"><Link className="nav-link" to="/">Ana Sayfa</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/market">İlanlar</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">Projeler</Link></li>
                <li className="nav-item"><Link to="/tasks">İlan Ekle</Link></li>
                <li className="nav-item"><Link to="/tasks">İlanlarım</Link></li>
                <li><Link to="/history">Profilim</Link></li>
                <li><Link to="/" onClick={logoutUser}>Çıkış Yap</Link></li>
            </>
        )
    }

    const nobreminloggedRouter = () => {
        return (
            <>
                <li className="nav-item"><Link className="nav-link" to="/">Ana Sayfa</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/market">İlanlar</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">Projeler</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Giriş Yap</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Kayıt Ol</Link></li>
            </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%",
    }

    return (
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                                <img src={Logo} alt="logo" style={{ width: '170px' }} />
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto" style={styleMenu}>
                                {
                                    isLogged ?
                                    isAdmin ?
                                    adminRouter() :
                                    nobreminadminRouter() :
                                    nobreminloggedRouter()
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header;