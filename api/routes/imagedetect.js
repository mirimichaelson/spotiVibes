// // Copyright 2017 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //      http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.

// 'use strict';

// async function detectFaces(fileName) {
//   // [START vision_face_detection]
//   // Imports the Google Cloud client library
//   const vision = require('@google-cloud/vision');

//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();

//   /**
//    * TODO(developer): Uncomment the following line before running the sample.
//    */
//   const fileName = './resources/josh.jpg';

//   const [result] = await client.faceDetection(fileName);
//   const faces = result.faceAnnotations;
//   console.log('Faces:');
//   faces.forEach((face, i) => {
//     console.log(`  Face #${i + 1}:`);
//     console.log(`    Joy: ${face.joyLikelihood}`);
//     console.log(`    Anger: ${face.angerLikelihood}`);
//     console.log(`    Sorrow: ${face.sorrowLikelihood}`);
//     console.log(`    Surprise: ${face.surpriseLikelihood}`);
//   });
//   // [END vision_face_detection]
// }

// // async function detectFacesGCS(bucketName, fileName) {
// //   // [START vision_face_detection_gcs]
// //   // Imports the Google Cloud client libraries
// //   const vision = require('@google-cloud/vision');

// //   // Creates a client
// //   const client = new vision.ImageAnnotatorClient();

// //   /**
// //    * TODO(developer): Uncomment the following lines before running the sample.
// //    */
// //   // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// //   // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// //   // Performs face detection on the gcs file
// //   const [result] = await client.faceDetection(`gs://${bucketName}/${fileName}`);
// //   const faces = result.faceAnnotations;
// //   console.log('Faces:');
// //   faces.forEach((face, i) => {
// //     console.log(`  Face #${i + 1}:`);
// //     console.log(`    Joy: ${face.joyLikelihood}`);
// //     console.log(`    Anger: ${face.angerLikelihood}`);
// //     console.log(`    Sorrow: ${face.sorrowLikelihood}`);
// //     console.log(`    Surprise: ${face.surpriseLikelihood}`);
// //   });
// //   // [END vision_face_detection_gcs]
// // }


// require(`yargs`) // eslint-disable-line
//   .demand(1)
//   .command(
//     'faces <fileName>',
//     'Detects faces in a local image file.',
//     {},
//     opts => detectFaces(opts.fileName)
//   )
//   // .command(
//   //   'faces-gcs <bucketName> <fileName>',
//   //   'Detects faces in an image in Google Cloud Storage.',
//   //   {},
//   //   opts => detectFacesGCS(opts.bucketName, opts.fileName)
//   // )

//   .example('node $0 faces ./resources/josh.jpg')
//   // .example('node $0 faces-gcs my-bucket your-image.jpg')

//   .wrap(120)
//   .recommendCommands()
//   .epilogue('For more information, see https://cloud.google.com/vision/docs')
//   .help()
//   .strict().argv;



async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/josh.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}