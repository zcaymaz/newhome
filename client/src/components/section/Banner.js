import { useState } from "react";
import banner from "../images/banner.jpg";

const Banner = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="banner d-flex align-items-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="bg-custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="banner-area text-center pt-4 pb-4">
                <h2 className="mt-2 mb-4 banner-title">
                  <strong>Ev Aramanın Kolay Yolu</strong>{" "}
                </h2>
                <div className="search-area">
                  <input
                    type="text"
                    value={props.value || searchTerm}
                    onChange={props.onChange || handleSearch}
                    placeholder="İlan Ara"
                    style={{width:'100%'}}
                  />
                  <button className="btn-search m-2">
                    <i
                      className="fas fa-search"
                      style={{ marginRight: "8px" }}
                    />
                    Ara
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
