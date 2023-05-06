import { Store, Home, Chair, SelectAll } from '@mui/icons-material';
import { Button, CardActionArea, Stack } from "@mui/material";

const FlatItem = ({ slug }) => {
    const isAdmin = localStorage.getItem('role') === '1' ? true : false
    const adminRouter = () => {
        return (
            <Stack direction="row" spacing={3} bgcolor="white">
                <Button className='adminButtonPut'>Düzenle</Button>
                <Button className='adminButtonDelete'>Sil</Button>
            </Stack>
        )
    }

    return (
        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <div className="item">
                <CardActionArea href={`/flat/${slug}`}>
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
                </CardActionArea>
                {isAdmin ? adminRouter() : null}
            </div>
        </div >
    )
}

export default FlatItem