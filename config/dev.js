// each property in the exported object is a constant of the same name/value in the source

// don't forget to JSON.stringify() the values of each property.
module.exports = {
  FIREBASE_CONFIG: JSON.stringify({
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
  }),
  // the current environment
  ENVIRONMENT: JSON.stringify("dev")
}
