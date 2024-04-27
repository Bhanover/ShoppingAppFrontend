import React, { useState } from "react";
import FileBase64 from "react-file-base64";

const ImageUploader = ({ onImagesUpload }) => {
  const [imageDetails, setImageDetails] = useState([]);

  const handleImageChange = (files) => {
    const formattedFiles = files.map((file) => ({
      name: file.name,
      imageUrl: file.base64,
      type: file.type.split("/")[1],
    }));
    setImageDetails(formattedFiles);
    onImagesUpload(formattedFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageDetails.filter((_, i) => i !== index);
    setImageDetails(updatedImages);
    onImagesUpload(updatedImages);
  };

  return (
    <div>
      <FileBase64 multiple={true} onDone={handleImageChange} />
      {imageDetails.length > 0 && (
        <div className="AddItemImage">
          {imageDetails.map((image, index) => (
            <div key={index}>
              <img src={image.imageUrl} alt={`Preview ${index}`} />
              <button onClick={() => handleRemoveImage(index)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
