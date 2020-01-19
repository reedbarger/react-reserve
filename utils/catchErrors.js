export default function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and 
    // the server responded with a status code 
    // that is not in the range of 2XX
    errorMsg = error.response.data;
    console.log('Error response', errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but 
    // no response was received
    errorMsg = error.request;
    console.log('Error request', errorMsg);
  } else {
    // Something else happened 
    // in making the request that triggered an error
    errorMsg = error.message;
    console.log('Error message', errorMsg);
  }
  displayError(errorMsg);
}