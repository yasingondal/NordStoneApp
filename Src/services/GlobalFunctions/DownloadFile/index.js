import { Platform, PlatformColor } from 'react-native';
import RNFS from 'react-native-fs';
import { Toaster } from '../../../components/Toaster';


function get_url_extension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}

function replaceSpacesWithUnderscores(inputString) {
    const hasSpecialCharacters = /[^A-Za-z0-9]/.test(inputString);
    if(hasSpecialCharacters){
        const resultString = inputString.replace(/[^A-Za-z0-9.]+/g, '');
        return resultString;
    }else{
        return inputString+"1"
    }
    
}

export const downloadFile = async (url, fileName,ignoreCheck) => {

    if(Platform.OS === 'ios'){

        const extension = get_url_extension(url);
        const customDownloadPath = RNFS.DocumentDirectoryPath + '/downloads';
        RNFS.exists(customDownloadPath)
          .then(exists => {
            if (!exists) {
              return RNFS.mkdir(customDownloadPath);
            }
            return Promise.resolve();
          })
          .then(() => {

            const downloadDest = `${customDownloadPath}/${replaceSpacesWithUnderscores(fileName)}.${extension}`;

            const options = {
              fromUrl:encodeURI(url),
              toFile: downloadDest,
            };

            RNFS.downloadFile(options)
              .promise.then(response => {
                console.log('File downloaded to ', response);
                Toaster({
                  Title: 'Success',
                  description: 'File Downloaded Successfully',
                  type: 'success',
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });


    }else{

      const extension = get_url_extension(url);

      var downloadDir = null;
      var downloadDest = null;

      try {
      
          downloadDir = RNFS.ExternalStorageDirectoryPath;
          downloadDest = `${downloadDir}/Download/${replaceSpacesWithUnderscores(fileName)}.${extension}`;

        const options = {
          fromUrl:encodeURI(url),
          toFile: downloadDest,
          background: true,
          begin: res => {
            console.log('Download has begun', res);

            if (res.statusCode == 200) {
              console.log('Downloaded');
            }
          },
          progress: res => {
            const progressPercentage =
              (res.bytesWritten / res.contentLength) * 100;
            console.log(`Download progress: ${progressPercentage.toFixed(2)}%`);
          },
        };

        const result = await RNFS.downloadFile(options).promise;

        Toaster({
          Title: 'Success',
          description: 'File Downloaded Successfully',
          type: 'success',
        });
        return result;

      } catch (error) {

        console.log('the error found is ', error);
        Toaster({
          Title: 'Download Failure',
          description: 'Sorry, File cannot be downloaded, try again',
          type: 'danger',
        });
        return error;
      }
    }
};
