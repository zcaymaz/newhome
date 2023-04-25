import BlogItem from "./BlogItem"

const Blog = () => {
    return (
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
                        <BlogItem link="blog-1" title="Proje Başlığı"/>
                        <BlogItem link="blog-2" title="Proje Başlığı"/>
                        <BlogItem link="blog-3" title="Proje Başlığı"/>
                        <BlogItem link="blog-4" title="Proje Başlığı"/>
                        <BlogItem link="blog-5" title="Proje Başlığı"/>
                        <BlogItem link="blog-6" title="Proje Başlığı"/>
                        <BlogItem link="blog-7" title="Proje Başlığı"/>
                        <BlogItem link="blog-8" title="Proje Başlığı"/>
                        <BlogItem link="blog-9" title="Proje Başlığı"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blog