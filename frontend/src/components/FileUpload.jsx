import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
export default function FileUpload({ onImageChange, images }) {
  const handleDrop = async (files) => {
    let formData = new FormData(); // 파일을 전달할  때 사용

    const config = {
      header: { "content-type": "multipart/form-data" }, // 헤더에 타입 명시
    };

    formData.append("file", files[0]); //file이라는 키와 files(파일들의 정보 객체) 값을 추가

    try {
      const response = await axiosInstance.post(
        // 백엔드에서 위에서 생성한 config와 formdata 보내기
        "/products/image",
        formData,
        config
      );
      onImageChange([...images, response.data.fileName]); // 원래 있던 image들에 백엔드에서 받은 새로운 image추가
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {(
          { getRootProps, getInputProps } //Dropzone 에서 가져온 인자들
        ) => (
          <section className="min-w-[300px] h-[300px] border flex items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl">+</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="flex-grow h-[300px] border flex  items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map(
          (
            image // 부모 에게 받아온  images들
          ) => (
            <div key={image} onClick={() => handleDelete(image)}>
              <img
                className="min-w-[300px] h-[300px]"
                src={`${import.meta.env.VITE_SERVER_URL}/${image}`} // 백엔드에서 정적 파일로 제공을 해줌
                alt={image} // 이미지의 데체 텍스트
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
