import { CardActionArea, Stack } from "@mui/material";
import {formatDate} from "./common/FormatDate"

const BlogItem = ({ title, ProjectId, description, finishDate, housingnumber, name, src, buttons }) => {

  const MAX_DESCRIPTION_LENGTH = 200;

  return (
    <div className="col-lg-4">
      <div className="blog-item">
        <CardActionArea href={`/blogdetail/${ProjectId}`}>
        <div className="item-image">
            <img className="img-fluid" src={src} alt="blog" />
          </div>
        <div className="blog-content">
          <h2 className="blog-title">
            {title}
          </h2>
          <Stack direction="row" spacing={3} marginTop={1} marginBottom={1} justifyContent="space-between">
            <div className="blog-info-item">
              <i className="far fa-calendar-alt "></i>
              <span>{formatDate(finishDate)}</span>
            </div>
            <div className="blog-info-item">
              <i className="fas fa-building"></i>
              <span> {housingnumber}</span>
            </div>
            <div className="blog-info-item">
              <i className="fas fa-store"></i>
              <span> {name}</span>
            </div>
          </Stack>
          <div className="blog-text">
            {description.length > MAX_DESCRIPTION_LENGTH
              ? `${description.substr(0, MAX_DESCRIPTION_LENGTH)}...`
              : description}
          </div>
        </div>
      </CardActionArea>
      {buttons}
      </div>
    </div>
  );
};

export default BlogItem;