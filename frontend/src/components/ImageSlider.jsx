import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map((image) => (
        <div key={image}>
          <img //백엔드에 있는 사진들 가져오기
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image} //express.staitc을 사용해서 정적 파일을 보낼수 있게 해놓음
            className="w-full max-h-[150px]"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
