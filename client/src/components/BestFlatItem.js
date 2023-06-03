import React from 'react';
import { Home, Chair, SelectAll, Store } from '@mui/icons-material';
import { CardActionArea } from "@mui/material";
import { formatCurrency } from './common/FormatCurrency';

const BestFlatItem = ({ flatSaletype, flatPrice, flatId, flatSrc, flatDescription, flatTitle, flatName, flatType, flatRoomnumber, flatSquaremeters }) => {

    return (
        <div className="best-estate">
            <div className="best-estate-item">
                <CardActionArea href={`/flatdetail/${flatId}`}>
                    <div className="best-estate-img-area">
                        <img className="best-estate-img" src={flatSrc} alt="flat" />
                        <div className={`best-estate-state ${flatSaletype === "Kiralık" ? "bg-green" : "bg-red"}`}>{flatSaletype}</div>
                    </div>
                    <div className="best-estate-content">
                        <h4>{flatTitle}</h4>
                        <span className='best-estate-description'>{flatDescription}</span>
                    </div>
                    <div className="best-estate-features2">
                        <div>
                            <Store fontSize="medium" /><span>{flatName}</span>
                        </div>
                    </div>
                    <div className="best-estate-features">
                        <div className="item-icon d-flex align-items-center justify-content-between">
                            <div className="best-estate-row">
                                <Home fontSize="medium" /><span>{flatType}</span>
                            </div>
                            <div className="best-estate-row">
                                <Chair fontSize="medium" /><span>{flatRoomnumber}</span>
                            </div>
                            <div className="best-estate-row">
                                <SelectAll fontSize="medium" /><span>{flatSquaremeters}</span>
                            </div>
                        </div>
                    </div>
                    <div className="best-estate-price">
                        <h5>{formatCurrency(flatPrice)}</h5>
                    </div>
                </CardActionArea>
            </div>
        </div>
    )
}

export default BestFlatItem