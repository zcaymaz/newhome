import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../BlogItem";
import Footer from "../Footer";

const Blog = () => {
  const [project, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/project/`).then((res) => {
        const reversedProject = res.data.reverse();
        setProjects(reversedProject);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
              {project.map((project) => (
                <BlogItem
                key={project._id}
                ProjectId={project._id}
                src={project.images && project.images.length > 0 ? project.images[0] : project.image}
                title={project.title}
                description={project.description}
                finishDate={project.finishDate}
                housingnumber={project.housingnumber}
                name={project.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
