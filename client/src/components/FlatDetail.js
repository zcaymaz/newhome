import React from "react";
import ImageGallery from 'react-image-gallery';
import { Store } from "@mui/icons-material";

const FlatDetail = () => {
    const images = [
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
        {
            original: '/img/banner.jpg',
            thumbnail: '/img/banner.jpg',
        },
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
    ];

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
                                <h3 className="flat-detail-title">İlan Başlığı.</h3>
                                <p className="fd-address">
                                    <i className="fas fa-map-marker-alt" />
                                    İlan Adresi
                                </p>
                            </div>
                            <div>
                                <span className="fd-price">2.350.000₺</span>
                            </div>
                        </div>
                        <ImageGallery flickThreshold={0.50} slideDuration={0} items={images} showNav={true} showFullscreenButton={true} showPlayButton={false} />
                        <div className="row">
                            <div className="col-lg-8">
                            <div className="fd-item fd-property-detail">
                                    <h4>İlan Bilgileri</h4>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <span>Mesken:  </span>
                                            <span>Daire</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Metrekare:  </span>
                                            <span>5</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Oda Sayısı:  </span>
                                            <span>1+1</span>
                                        </div>
                                        <div className="col-lg-3">
                                            <span>Emlak Tipi: </span>
                                            <span>Kiralık</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>İlan Açıklaması</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                </div>
                                <div className="fd-item fd-features">
                                    <h4>İlan Özellikleri</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>Isı Yalıtımı</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Yangın Alarmı</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Asansör</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Isıcam</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>PVC Doğrama</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>Ses Yalıtımı</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Güvenlik</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Jeneratör</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Bahçe</span>
                                        </div>
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
                                            <Store fontSize="medium" /><span> Günal Emlak </span>
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

export default FlatDetail