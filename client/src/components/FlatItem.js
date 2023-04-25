import { Store, Home, Chair, SelectAll } from '@mui/icons-material';
import { CardActionArea } from "@mui/material";

const FlatItem = ({ slug }) => {
    return (
        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <CardActionArea href={`/flat/${slug}`}>
                <div className="item">
                    <div className="item-image">
                        <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                    </div>
                    <div className="item-description">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="item-title">Bursa Gemlikde Deniz Manzaralı Daire</span>
                            <span className="item-price">3.500.000₺</span>
                        </div>
                        <div className="item-icon d-flex alig-items-center justify-content-between">
                            <div>
                                <Home fontSize="medium" /><span>Daire</span>
                            </div>
                            <div>
                                <Chair fontSize="medium" /><span> 3+1 </span>
                            </div>
                            <div>
                                <SelectAll fontSize="medium" /><span> 120m2 </span>
                            </div>
                            <div>
                                <Store fontSize="medium" /><span> Altın Emlak </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardActionArea>
        </div >
    )
}

export default FlatItem