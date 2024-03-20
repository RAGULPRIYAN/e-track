import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 	public confirmationResult?: firebase.auth.ConfirmationResult;

	constructor(private fireAuth: AngularFireAuth,private router: Router) {}

	public signInWithPhoneNumber(recaptchaVerifier: any, phoneNumber: any) {
		return new Promise<any>((resolve, reject) => {
			this.fireAuth
				.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
				.then((confirmationResult) => {
					this.confirmationResult = confirmationResult;
					resolve(confirmationResult);
				})
				.catch((error) => {
					console.log(error);
					reject('SMS not sent');
				});
		});
	}

	public async enterVerificationCode(code: string) {
		return new Promise<any>((resolve, reject) => {
			this.confirmationResult
				?.confirm(code)
				.then(async (result) => {
					const user = result.user;
					resolve(user);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}


	SignUp(email: string, password: string) {
		this.fireAuth.createUserWithEmailAndPassword(email, password)
		.then((res: any) => {
			this.router.navigateByUrl('/list');
		console.log('You are Successfully signed up!', res);
		})
		.catch((error: { message: any; }) => {
		console.log('Something is wrong:', error.message);
		});
		}


	signInGoogle(){
			this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
				console.log('success in google login', success);
			this.router.navigateByUrl('/list');
				// this.user =  success.user;
			  }).catch(err => {
				console.log(err.message, 'error in google login');
			  });
			// this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			// this.router.navigateByUrl('/list');
		}
}
