import React from "react";
import axios from "axios";

const DisplayFile = ({ filePath }) => {
  const downloadFile = () => {
    console.log(filePath);
    axios
      .get(`/files/download?filePath=${filePath}`, { responseType: "blob" })
      .then((response) => {
        
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        
        const a = document.createElement("a");
        a.href = url;
        a.download = filePath.split("/").pop(); 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <div>
      <button onClick={downloadFile}>Download File</button>
    </div>
  );
};

export default DisplayFile;
