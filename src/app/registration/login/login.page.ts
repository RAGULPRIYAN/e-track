
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import firebase from 'firebase/compat';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user :any;
  constructor(private router: Router, private platform: Platform,
    private fireAuth: AngularFireAuth,private authService: AuthService,) { 
      this.fireAuth.authState.subscribe((user) => {
        this.user = user ? user : null;
      });
    }

  ngOnInit() {
  }

  // googleSignUp(){
  //   console.log("function call")
  //   if (this.platform.is('cordova')) {
  //   }
  //   else{
  //     this.google.login({
  //       webClientId:'9842548374-nbmq20t5hkvsl0sohpv6ruvlfllduhpc.apps.googleusercontent.com',
  //       offline:true
  //     }).
  //     then((res:any)=>{
  //       console.log('Google signin done')
  //       console.log(res,'res checks done')
  //       this.router.navigateByUrl('/list');  
  //     })
  //   }
    
  // }

  googleSignUp() {
this.authService.signInGoogle()
    // this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   
  }

  fbSignUp(){
    
  }

  logout() {
    this.fireAuth.signOut();
  }

}
