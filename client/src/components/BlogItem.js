import { Link } from "react-router-dom"

const BlogItem = ({ title, link }) => {
    return (
        <div className="col-lg-4">
            <div className="blog-item">
                <div className="blog-img">
                    <img src="/img/product1.jpeg" alt="product" className="w-100" />
                </div>
                <div className="blog-content">
                    <h2 className="blog-title"><Link to={`/blog/${link}`}>{title}</Link></h2>
                    <div className="blog-info">
                        <div className="blog-info-item"><i className="far fa-calendar-alt "></i><span>Nisan 2024 Teslim</span></div>
                        <div className="blog-info-item"><i className="fas fa-building"></i><span>909 Konut</span></div>
                    </div>
                    <div className="blog-text">
                        Proje Açıklaması Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem