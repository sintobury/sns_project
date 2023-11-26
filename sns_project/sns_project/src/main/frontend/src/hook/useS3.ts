import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

// const S3 = new AWS.S3();

export const useS3 = () => {
  const getUrl = (path: string) => {
    // const download = async (filename: string) => {
    //   const data = await S3.getObject({
    //     Key: filename,
    //     Bucket: "testsnsproject",
    //   }).promise();
    //   if (data.Body) {
    //     const blob = new Blob([data.Body as Buffer], { type: `image/${type}` });
    //     // const urlCreator = window.URL || window.webkitURL;
    //     const imageUrl = URL.createObjectURL(blob);
    //     console.log(imageUrl);
    //     return imageUrl;
    //   }
    // };
    // const url = await download(path);
    // return url;
    if (path === null) {
      return "";
    } else if (path.includes("https://s3.ap-northeast-2.amazonaws.com/testsnsproject/")) {
      return path;
    }
    return `https://s3.ap-northeast-2.amazonaws.com/testsnsproject/${path}`;
  };

  return { getUrl };
};
