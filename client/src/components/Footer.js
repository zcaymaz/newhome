import React from "react"
import { Link } from "react-router-dom"
import Logo from "./logofooter.png"

const Footer = () => {
    const isLogged = localStorage.getItem('role') ? true : false
    const isAdmin = localStorage.getItem('role') === '1' ? true : false

    const adminRouter = () => {
        return (
            <>
                <li><a href="/dashboard" className="footerMenu">Kontrol Paneli</a></li>
            </>
        )
    }

    const nonAdminRouter = () => {
        return (
            <>
                <li><a href="/flatadd" className="footerMenu">İlan Ekle</a></li>
                <li><a href="/myprofile" className="footerMenu">Profilim</a></li>
            </>
        )
    }

    const noLoggedRouter = () => {
        return (
            <>
                <li><a href="/login" className="footerMenu">Giriş Yap</a></li>
                <li><a href="/register" className="footerMenu">Kayıt Ol</a></li>
            </>
        )
    }

    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <Link to="/">
                            <div className="d-flex align-items-center">
                                <img src={Logo} alt="logo" style={{ width: '170px' }} />
                            </div>
                        </Link>
                        <span className="footer-other-text d-block mt-3 mb-3">
                            EmlakBankası sitesinde kullanıcılar tarafından sağlanan
                            her türlü ilan, bilgi, içerik ve görselingerçekliği, orijinalliği, güvenilirliği
                            ve doğruluğuna ilişkin sorumluluk bu içerikleri giren kullanıcıya ait olup,
                            emlakbankası.com'un bu hususlarla ilgili herhangi bir sorumluluğu bulunmamaktadır.</span>
                        <div className="footer-social">
                            <div className="footer-social-item"><i className="fab fa-facebook"></i></div>
                            <div className="footer-social-item"><i className="fab fa-twitter"></i></div>
                            <div className="footer-social-item"> <i className="fab fa-instagram"></i></div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <p className="footer-title">Menü</p>
                        <ul className="footer-ul">
                            <li><a href="/" className="footerMenu">Ana Sayfa</a></li>
                            <li><a href="/market" className="footerMenu">İlanlar</a></li>
                            <li><a href="/blog" className="footerMenu">Projeler</a></li>
                            {
                                isLogged ?
                                    isAdmin ?
                                        adminRouter() :
                                        nonAdminRouter() :
                                    noLoggedRouter()
                            }
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <p className="footer-title">İletişim</p>
                        <ul className="footer-ul">
                            <li className="d-flex">
                                <div className="footer-info-item" ><i className="fas fa-envelope"></i></div> <span>newhome@gmail.com</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-map-marker-alt"></i></div> <span>ANKARA</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-phone-alt"></i></div> <span>0534 899 42 91</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer