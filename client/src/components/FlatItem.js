import { Store, Home, Chair, SelectAll } from '@mui/icons-material';
import { Button, CardActionArea, Stack } from "@mui/material";

const FlatItem = (props) => {
    const isAdmin = localStorage.getItem('role') === '1' ? true : false
    const adminRouter = () => {
        return (
            <Stack direction="row" spacing={3} bgcolor="white">
                <Button className='adminButtonPut'>Düzenle</Button>
                <Button className='adminButtonDelete'>Sil</Button>
            </Stack>
        )
    }
    function formatCurrency(price) {
        const amount = price || 0
        const formattedAmount = amount.toLocaleString('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        const tlIndex = formattedAmount.indexOf('₺');
        const formattedAmountWithSymbolAtEnd = formattedAmount.slice(0, tlIndex) + formattedAmount.slice(tlIndex + 1) + ' ₺';
        return formattedAmountWithSymbolAtEnd;
    }
    return (
        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <div className="item">
                <CardActionArea href={`/flat/`}>
                    <div className="item-image">
                        <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                    </div>
                    <div className="item-description">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="item-title">{props.title}</span>
                            <span className="item-price">{formatCurrency(props.price)}</span>
                        </div>
                        <div className="item-icon d-flex alig-items-center justify-content-between">
                            <div>
                                <Home fontSize="medium" /><span>{props.type}</span>
                            </div>
                            <div>
                                <Chair fontSize="medium" /><span>{props.roomnumber}</span>
                            </div>
                            <div>
                                <SelectAll fontSize="medium" /><span>{props.squaremeters}</span>
                            </div>
                            <div>
                                <Store fontSize="medium" /><span></span>
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