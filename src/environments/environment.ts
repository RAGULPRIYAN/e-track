// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  
    production: false,  
    Logging: {
      IsFirebase: true,
      LogLevel: "Warn"
  },
    firebase: {  
      apiKey: "AIzaSyAihfGzibkuW59eTwVjOPDYebMAxaBuggc",
      authDomain: "ionic-bb82e.firebaseapp.com",
      projectId: "ionic-bb82e",
      storageBucket: "ionic-bb82e.appspot.com",
      messagingSenderId: "9842548374",
      appId: "1:9842548374:web:d67c892662a739889c2cb7",
      measurementId: "G-100P8FWG4D"
    }  
  };  
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
