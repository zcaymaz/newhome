import BlogItem from "../BlogItem"
import Footer from "../Footer"

const Blog = () => {
    return (
        <>
            <section className="blog">
                <div className="page-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-title">Projeler</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <BlogItem link="detail/1" title="Proje Başlığı" />
                            <BlogItem link="detail/2" title="Proje Başlığı" />
                            <BlogItem link="detail/3" title="Proje Başlığı" />
                            <BlogItem link="detail/4" title="Proje Başlığı" />
                            <BlogItem link="detail/5" title="Proje Başlığı" />
                            <BlogItem link="detail/6" title="Proje Başlığı" />
                            <BlogItem link="detail/7" title="Proje Başlığı" />
                            <BlogItem link="detail/8" title="Proje Başlığı" />
                            <BlogItem link="detail/9" title="Proje Başlığı" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Blog