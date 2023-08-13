import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = [];

      product.images.map((imageName) => {
        return images.push({
          // imageGallery 포맷을 맞추기 위해 아래 형식으로 보냄
          original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
        });
      });

      setImages(images);
    }
  }, [product]);

  return <ImageGallery items={images} />;
};

export default ProductImage;
