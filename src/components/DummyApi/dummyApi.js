export const dummyApiCall = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful API response
      resolve({
        success: true,
        message: 'File uploaded successfully',
        fileName: file.name,
        fileSize: file.size,
      });
    }, 1000); // Simulates a 1 second delay
  });
};
