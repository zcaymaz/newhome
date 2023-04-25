import React from "react"
import { Link } from "react-router-dom"
import Logo from "./logonavbar.png"

const Header = () => {
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
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Ana Sayfa</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/market">İlanlar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blog">Projeler</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="#">Category <i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-ul">
                                        <li><Link to="#">item</Link></li>
                                        <li><Link to="#">item</Link></li>
                                        <li><Link to="#">item</Link></li>
                                    </ul>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">İletişim</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Giriş Yap</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Kayıt Ol</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header;