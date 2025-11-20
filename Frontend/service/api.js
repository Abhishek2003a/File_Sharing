const UploadFile = async (fileData) => {
  try {
    const response = await fetch(
      "https://file-sharing-akfv.vercel.app/upload",
      {
        method: "POST",
        body: fileData,
      }
    );
    return response.json();
  } catch (error) {
    console.log("Error while calling upload file ", error.message);
  }
};

const DownloadFile = async (fileId) => {
  try {
    const response = await fetch(
      `https://file-sharing-akfv.vercel.app/files/${fileId}`,
      {
        method: "GET",
      }
    );
    return response.blob();
  } catch (error) {
    console.log("Error while calling download file ", error.message);
  }
};
export { UploadFile, DownloadFile };
