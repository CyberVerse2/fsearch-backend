import { ENVIRONMENT } from '../config/environment.js';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = ENVIRONMENT.CLARIFAI.PAT;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = ENVIRONMENT.CLARIFAI.USER_ID;
const APP_ID = ENVIRONMENT.CLARIFAI.APP_ID;
// Change these to whatever model and image URL you want to use
const MODEL_ID = ENVIRONMENT.CLARIFAI.MODEL_ID;
const MODEL_VERSION_ID = ENVIRONMENT.CLARIFAI.MODEL_VERSION_ID;
import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ' + PAT);

export const faceRecognition = async (imageUrl) => {
  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      model_id: MODEL_ID,
      version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
              // base64: imageBytes,
              allow_duplicate_url: true
            }
          }
        }
      ]
    },
    metadata,
    (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error('Post model outputs failed, status: ' + response.status.description);
      }

      const regions = response.outputs[0].data.regions;

      const faceRegions = regions.forEach((region) => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        region.data.concepts.map(() => {
          // Accessing and rounding the concept value
          // const name = concept.name;
          // const value = concept.value.toFixed(4);
          const faceRegion = [
            parseFloat(topRow),
            parseFloat(leftCol),
            parseFloat(bottomRow),
            parseFloat(rightCol)
          ];
          return faceRegion;
        });
      });
      return faceRegions;
    }
  );
};
