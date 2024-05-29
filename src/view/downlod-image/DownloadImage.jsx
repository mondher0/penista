/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";
import { baseUrl } from "../../utils/constants";

const DownloadImage = ({ title }) => {
  const { img } = useParams();
  const extension = new URLSearchParams(window.location.search).get(
    "extension",
  );
  console.log(extension);
  console.log(img);
  return (
    <>
      <NavBar title={title} />
      <div
        className="download-image"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={`${baseUrl}/img/${img}.${extension}`} alt="image" />
      </div>
    </>
  );
};

export default DownloadImage;
