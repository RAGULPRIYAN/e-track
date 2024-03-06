import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public confirmationResult?: firebase.auth.ConfirmationResult;

	constructor(private fireAuth: AngularFireAuth) {}

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
}
