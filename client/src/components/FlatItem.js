import { Store, Home, Chair, SelectAll } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import { formatCurrency } from "./common/FormatCurrency";

const FlatItem = (props) => {

  return (
    <div className="text-center col-lg-4 col-12 col-md-6 ">
      <div className="item">
        <CardActionArea href={`/flatdetail/${props.flatId}`}>
          <div className="item-image">
            <img className="img-fluid" src={props.src} alt="flat" />
          </div>
          <div className="item-description">
            <div className="d-flex justify-content-between mb-3">
              <span className="item-title" style={{textTransform:'uppercase'}}>{props.title}</span>
              <span className="item-price">{formatCurrency(props.price)}</span>
            </div>
            <div className="item-icon d-flex alig-items-center justify-content-between">
              <div>
                <Home fontSize="small" />
                <span>{props.type}</span>
              </div>
              <div>
                <Chair fontSize="small" />
                <span>{props.roomnumber}</span>
              </div>
              <div>
                <SelectAll fontSize="small" />
                <span>{props.squaremeters}</span>
              </div>
              <div>
                <Store fontSize="small" />
                <span>{props.name}</span>
              </div>
            </div>
          </div>
        </CardActionArea>
        {props.buttons || null}
      </div>
    </div>
  );
};

export default FlatItem;
