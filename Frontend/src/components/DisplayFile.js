import React from "react";
import axios from "axios";

const DisplayFile = ({ filePath }) => {
  const downloadFile = () => {
    console.log(filePath);
    axios
      .get(`/files/download?filePath=${filePath}`, { responseType: "blob" })
      .then((response) => {
        // Create a blob URL for the file
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filePath.split("/").pop(); // Set the file name
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
