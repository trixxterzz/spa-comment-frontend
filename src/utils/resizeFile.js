import Resizer from "react-image-file-resizer";

export default function resizeFile(file, format){
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          320,
          240,
          format.toUpperCase(),
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
    });
}