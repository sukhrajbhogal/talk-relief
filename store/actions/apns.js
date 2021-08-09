//const jwt = require("jsonwebtoken");
//const RNFS = require("react-native-fs");
//const apn = require("apn");
//const http2 = require("http2");

export const sendNotif = (token) => {
  const options = {
    token: {
      key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
      keyId: "key-id",
      teamId: "developer-team-id",
    },
    production: false,
  };

  const apnProvider = new apn.Provider(options);
};

// const authToken = jwt.sign(
//   {
//     iss: "3W67JPB7S7",
//     iat: Math.round(new Date().getTime() / 1000),
//   },
//   RNFS.readFile("./AuthKey_4HSU2P998W.p8", "utf8"),
//   {
//     header: {
//       alg: "ES256",
//       kid: "4HSU2P998W",
//     },
//   }
// );

// const client = http2.connect(
//   IS_PRODUCTION
//     ? "https://api.push.apple.com"
//     : "https://api.sandbox.push.apple.com"
// );

// const deviceToken = "device token grabbed cient-side";

// headers = {
//   ":method": "POST",
//   ":scheme": "https",
//   "apns-topic": "com.talkrelief.talkrelief",
//   ":path": "/3/device/" + deviceToken,
//   authorization: `bearer ${authToken}`,
// };

// const request = client.request(headers);

// request.setEncoding("utf8");

// request.write(
//   JSON.stringify({
//     aps: {
//       alert: {
//         title: "You've got mail!",
//         body: "Hello world!",
//       },
//     },
//   })
// );

// request.on("response", (headers, flags) => {
//   for (const name in headers) {
//     console.log(`${name}: ${headers[name]}`);
//   }
// });

// let data = "";
// request.on("data", (chunk) => {
//   data += chunk;
// });

// request.on("end", () => {
//   console.log(`\n${data}`);
//   client.close();
// });

// request.end();
