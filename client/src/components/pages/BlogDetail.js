/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from 'react-image-gallery';
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
        <ImageGallery flickThreshold={0.50} slideDuration={0} items={projectImages} showNav={true} showFullscreenButton={true} showPlayButton={false} />
        <div className="col-lg-8">
          <div className="blog-detail">
            <span className="blog-detail-category"></span>
            <h2 style={{ marginTop: "2rem" }} className="blog-detail-title">
              {project.title}
            </h2>
            <p className="blog-detail-content" style={{ marginTop: "2.5rem" }}>
              {project.description}
            </p>
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
        </div>
        <div className="col-lg-4">
          <div className="right-sidebar">
            <div className="widget">
              <h4>Projeyi Envanterinde Tutan</h4>
              <div style={{ marginTop: "1rem" }} className="widget-content">
                <ul className="category-ul">
                  <li><i style={{ paddingRight: '0.6rem' }} className="fas fa-store" />{project.name}</li>
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
