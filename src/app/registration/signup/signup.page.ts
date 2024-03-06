import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  CountryJson: any;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  public recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.CountryJson= [
      { name: 'Afghanistan', dial_code: '+93', code: 'AF' },
      { name: 'Albania', dial_code: '+35', code: 'AL' },
      { name: 'Algeria', dial_code: '+213', code: 'DZ' },
      { name: 'AmericanSamoa', dial_code: '+1 684', code: 'AS' },
      { name: 'Andorra', dial_code: '+376', code: 'AD' },
      { name: 'Angola', dial_code: '+244', code: 'AO' },
      { name: 'Anguilla', dial_code: '+1 264', code: 'AI' },
      { name: 'Antigua and Barbuda', dial_code: '+1268', code: 'AG' },
      { name: 'Argentina', dial_code: '+54', code: 'AR' },
      { name: 'Armenia', dial_code: '+374', code: 'AM' },
      { name: 'Aruba', dial_code: '+297', code: 'AW' },
      { name: 'India', dial_code: '+91', code: 'IN' },
      
      ]
  }
  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event: { detail: { value: any; }; }) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event: any) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.OtpVerification();
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }



  // CountryJson = environment.CountryJson;
	// OTP: string = '';
	// Code: any;
	// PhoneNo: any;
	// CountryCode: any = '+92';
	// showOTPInput: boolean = false;
	// OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s';
	// public recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
	// public user: any = { user_phone: '' };
	// confirmationResult: any;

	// constructor(
	// 	private alertController: AlertController,
	// 	private authService: AuthService,
	// 	// private angularFireAuth: AngularFireAuth
	// ) {}
  // ionViewDidEnter(): void {
  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
	// 		size: 'invisible',
	// 		callback: (response: any) => {
	// 			console.log(response);
	// 			console.log(this.recaptchaVerifier);
	// 		},
	// 		'expired-callback': () => {}
	// 	});
  // }


	// signinWithPhoneNumber($event: any) {
	// 	if (this.user.user_phone) {
	// 		this.authService
	// 			.signInWithPhoneNumber(this.recaptchaVerifier, '+92' + this.user.user_phone)
	// 			.then((success) => {
	// 				this.OtpVerification();
	// 			});
	// 	}
	// }

	// async showSuccess() {
	// 	const alert = await this.alertController.create({
	// 		header: 'Success',
	// 		buttons: [
	// 			{
	// 				text: 'Ok'
	// 			}
	// 		]
	// 	});
	// 	alert.present();
	// }

  // async OtpVerification() {
	// 	const alert = await this.alertController.create({
	// 		header: 'Enter OTP',
	// 		mode: 'ios',
	// 		backdropDismiss: false,
	// 		inputs: [
	// 			{
	// 				name: 'otp',
	// 				type: 'text',
	// 				placeholder: 'Enter your otp'
	// 			}
	// 		],
	// 		buttons: [
	// 			{
	// 				text: 'Enter',
	// 				handler: (res: { otp: string }) => {
	// 					this.authService.enterVerificationCode(res.otp).then(async (userData) => {
	// 						this.showSuccess();
	// 					});
	// 				}
	// 			}
	// 		]
	// 	});
	// 	await alert.present();
	// }

 
}
