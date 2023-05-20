/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import { Store } from "@mui/icons-material";
import axios from 'axios';
import { formatCurrency } from "../common/FormatCurrency";

const FlatDetail = ({match}) => {
    const flatId = match.params.id;
    const [flat, setFlat] = useState({});
    const [flatImages, setFlatImages] = useState([]);
    const [flatFeatures, setFlatFeatures] = useState([]);
    const [flatLocation, setflatLocation] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/${flatId}`)
            .then((res) => {
                console.log(res);
                setFlat(res.data);
                res.data.images.map((image) => {
                    setFlatImages((oldImages) => [...oldImages, {
                        original: image, thumbnail: image
                    }])
                });
                setFlatFeatures(res.data.features);
                setflatLocation(res.data.location);
            })
            .catch((error) => { console.error(error); });
    }, [flatId]);

    return (
        <div className="flat-detail">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">İlan Detayı</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            <div>
                                <h3 className="flat-detail-title">{flat.title}</h3>
                                {flatLocation.map((location, index) => (
                                    <p className="fd-address" key={index}>
                                        <i className="fas fa-map-marker-alt" />
                                        {location.province}/{location.district}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <span className="fd-price">{formatCurrency(flat.price)}</span>
                            </div>
                        </div>
                        <ImageGallery flickThreshold={0.50} slideDuration={0} items={flatImages} showNav={true} showFullscreenButton={true} showPlayButton={false} />
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="fd-item fd-property-detail">
                                    <h4>İlan Bilgileri</h4>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <span>Mesken:  </span>
                                            <span>{flat.type}</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Metrekare:  </span>
                                            <span>{flat.squaremeters}</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Oda Sayısı:  </span>
                                            <span>{flat.roomnumber}</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Emlak Tipi: </span>
                                            <span>{flat.saletype}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>İlan Açıklaması</h4>
                                    <p>{flat.description}</p></div>
                                <div className="fd-item fd-features">
                                    <h4>İlan Özellikleri</h4>
                                    <div className="row">
                                        {flatFeatures.map((feature, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <i className="fa fa-check"></i>
                                                <span>{feature.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>İlan Konumu</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy" title="frame1" />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4>Evi Envanterinde Tutan</h4>
                                    <ul className="category-ul">
                                        <div>
                                            <Store fontSize="large" /><span> {flat.name} </span>
                                        </div>
                                    </ul>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Benzer İlanlar</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Son Eklenenler</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FlatDetail;