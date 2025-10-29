const UploadFile = async (fileData) => {
  try {
    const response = await fetch("http://localhost:9000/upload", {
      method: "POST",
      body: fileData,
    });
    return response.json();
  } catch (error) {
    console.log("Error while calling upload file ", error.message);
  }
};

const DownloadFile = async (fileId) => {
  try {
    const response = await fetch(`http://localhost:9000/files/${fileId}`, {
      method: "GET",
    });
    return response.blob();
  } catch (error) {
    console.log("Error while calling download file ", error.message);
  }
};
export { UploadFile, DownloadFile };
