import { useEffect, useState } from "react"
import Slider from "react-slick";
import Title from "../common/Title"
import BestFlatItem from "../BestFlatItem"
import axios from 'axios'

const BestFlatList = () => {
    const [flat, setFlat] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/`)
            .then((res) => {
                setFlat(res.data);
            })
            .catch((error) => { console.error(error); });
    }, []);
    const title = {
        text: "En Yeni İlanlar",
        description: ""
    }
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoPlay: false,
        arrows: true,
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
                            {flat.map((flat) => (
                                <BestFlatItem
                                    key={flat._id}
                                    flatId={flat._id}
                                    flatSrc={flat.images && flat.images.length > 0 ? flat.images[0] : flat.image}
                                    flatName={flat.name}
                                    flatTitle={flat.title}
                                    flatDescription={flat.description}
                                    flatPrice={flat.price}
                                    flatSaletype={flat.saletype}
                                    flatType={flat.type}
                                    flatRoomnumber={flat.roomnumber}
                                    flatSquaremeters={flat.squaremeters}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default BestFlatList