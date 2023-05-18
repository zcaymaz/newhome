import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import BlogItem from "../BlogItem";
import axios from "axios";

const BlogList = () => {
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

  const title = {
    text: "Öne Çıkan Projeler",
    description: "",
  };

  return (
    <section className="section-all-re">
      <div className="container">
        <Title title={title.text} description={title.description} />
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
    </section>
  );
};

export default BlogList;
