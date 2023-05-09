import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import FlatItem from "./FlatItem"
import Combobox from "./common/Combobox"
import Footer from "./Footer";
import axios from 'axios'

const Market = () => {
    const [search, setSearch] = useState();
    const [find, setFind] = useState([]);
    const [word, setWord] = useState("");
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/`, {
            params: { useremail: localStorage.getItem('email'), name: localStorage.getItem('name') }
        })
            .then((res) => {
                const data = res.data.map((flat) => ({
                    ...flat,
                    images: flat.images.map((image) => {
                        const img = new Image();
                        img.src = `data:image/jpeg;base64,${image}`;
                        return { original: img.src, thumbnail: img.src };
                    })
                }));
                setFlats(data);
            })
            .catch((error) => { console.error(error); });
    }, []);

    useEffect(() => {
        setSearch(["a", "b", "test", "mb"])
    }, [])
    const findSearch = (e) => {
        setWord(e.target.value)
        const filteredCountries = search.filter(item => item.indexOf(e.target.value) > -1 ? item : null);
        e.target.value.length === 0 ? setFind([]) : setFind(filteredCountries);
    }
    const findResult = () => {
        if (find.length === 0 && word.length > 0) {
            return <div className="find-search2">Not Found</div>
        }
        if (find.length > 0) {
            return <div className="find-search2">
                {
                    find.map(item => {
                        return <Link key={item} to="#">{item}</Link>
                    })
                }
            </div>
        }
    }


    return (
        <>
            <section className="about">
                <div className="page-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-title">İlanlar</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-market">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <Combobox label="İl-İlçe" />
                            </div>
                            <div className="col-lg-2">
                                <Combobox label="Fiyat" />
                            </div>
                            <div className="col-lg-2">
                                <Combobox label="Oda Sayısı" />
                            </div>
                            <div className="col-lg-6">
                                <div className="search-area2">
                                    <input value={word} onChange={(e) => findSearch(e)} type="text" className="inp-search" placeholder="İl,ilçe,mahalle..." />
                                    <button className="btn-search2">
                                        <i className="fas fa-search" style={{ marginRight: '8px' }} />
                                        Ara
                                    </button>
                                </div>
                                {findResult()}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-all-re">
                    <div className="container">
                        <div className="row">
                            {flats.map((flat) => (
                                <FlatItem
                                    name={flat.name}
                                    title={flat.title}
                                    price={flat.price}
                                    type={flat.type}
                                    roomnumber={flat.roomnumber}
                                    squaremeters={flat.squaremeters}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default Market