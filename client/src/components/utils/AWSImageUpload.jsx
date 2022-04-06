import AWS from "aws-sdk";

function AWSImageUpload(image, desiredName) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const fileContent = image;

  const params = {
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: desiredName,
    Body: fileContent,
    ContentType: "image/JPEG",
  };

  s3.upload(params, (err, data) => {
    if (err) return new Error(err);
    console.log("File successfully uploaded", data.Location);
  });
}

export default AWSImageUpload;
