/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import { formatDate } from "../common/FormatDate";

const BlogDetail = ({ match }) => {
  const ProjectId = match.params.id;
  const [project, setProject] = useState({});
  const [projectImages, setProjectImages] = useState([]);
  const [projectFeatures, setProjectFeatures] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/project/${ProjectId}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
        res.data.images.map((image) => {
          setProjectImages((oldImages) => [
            ...oldImages,
            {
              original: image,
              thumbnail: image,
            },
          ]);
        });
        setProjectFeatures(res.data.features);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ProjectId]);

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="blog-detail">
            <img className="w-100" src="/img/product1.jpeg" alt="product" />
            <span className="blog-detail-category"></span>
            <h2 style={{ marginTop: "2rem" }} className="blog-detail-title">
              {project.title}
            </h2>
            <p className="blog-detail-content" style={{ marginTop: "2.5rem" }}>
              {project.description}
            </p>
            <h2 className="blog-detail-alttitle">Lorem ipsum dolor sit amet</h2>
            <p className="blog-detail-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="right-sidebar">
            <div className="widget">
              <h4>Projeyi Envanterinde Tutan</h4>
              <div style={{ marginTop: "1rem" }} className="widget-content">
                <ul className="category-ul">
                  <li><i style={{paddingRight:'0.6rem'}} className="fas fa-store"/>{project.name}</li>
                </ul>
              </div>
            </div>
            <div className="widget">
              <h4>Proje Tarihi</h4>
              <div style={{ marginTop: "1rem" }} className="widget-content">
                <ul className="category-ul">
                  <li>Teslim Tarihi: {formatDate(project.finishDate)}</li>
                  <li>Başlangıç Tarihi: {formatDate(project.startDate)}</li>
                </ul>
              </div>
            </div>
            <div className="fd-item fd-features">
              <h4>Konut Özellikleri</h4>
              <div className="row">
                {projectFeatures.map((feature, index) => (
                  <div className="col-lg-6" key={index}>
                    <i className="fa fa-check"></i>
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="widget">
              <h5>Proje Adresi</h5>
              <div style={{ marginTop: "1rem" }} className="widget-content">
                {project.address}
              </div>
            </div>
            <div className="widget">
              <h5>Konut Sayısı</h5>
              <div style={{ marginTop: "1rem" }} className="widget-content">
                <i className="fas fa-building"></i>
                {project.housingnumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
{
  /* <div className="widget">
              <div className="widget-content">
                <input
                  type="text"
                  className="widget-search-inp"
                  placeholder="Search"
                />
              </div>
            </div> */
}
