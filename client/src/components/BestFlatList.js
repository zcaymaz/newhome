import React, { Component } from "react";
import Slider from "react-slick";
import Title from "./Title"
import BestFlatItem from "./BestFlatItem"

export default class BestFlatList extends Component {
    render() {
        const title = {
            text: "En Yeni İlanlar",
            description: ""
        }
        const settings = {
            infinite: true,
            speed: 1500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoPlay: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };
        return (
            <section className="section-best-estate"> 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Title title={title.text} description={title.description} />
                            <Slider {...settings}>
                                <BestFlatItem flatState="Kiralık" flatMoney="4560₺" />
                                <BestFlatItem flatState="Satılık" flatMoney="2.350.000₺" />
                                <BestFlatItem flatState="Kiralık" flatMoney="4560₺" />
                                <BestFlatItem flatState="Kiralık" flatMoney="4560₺" />
                                <BestFlatItem flatState="Satılık" flatMoney="1.425.000₺" />
                                <BestFlatItem flatState="Kiralık" flatMoney="4560₺" />
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}