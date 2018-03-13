import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

	isLight: string = "primary";
	isCam: string = "primary";
	
	constructor(private storage: Storage, private qrScanner: QRScanner, public navCtrl: NavController, private platform: Platform, public events: Events, private zone: NgZone) 
	{
		this.platform.ready().then(() => {
			this.scanBarcode();
		});
	}

  	lightToggle(getColor: string)
  	{	
		if(this.isLight === 'light') 
		{
			this.isLight = "primary";
			this.qrScanner.disableLight();
		}
		else if(this.isLight === 'primary') 
		{
			this.isLight = "light";
			this.qrScanner.enableLight();
		}
  	}

  	camToggle(getColor: string)
  	{	
		if(this.isCam === 'light') 
		{
			this.isCam = "primary";
			this.qrScanner.useBackCamera();
		}
		else if(this.isLight === 'primary') 
		{
			this.isCam = "light";
			this.qrScanner.useFrontCamera();
		}
  	}

  	async scanBarcode(){
  	// Optionally request the permission early
	this.qrScanner.prepare()
	  .then((status: QRScannerStatus) => {
	     if (status.authorized) {
	       // camera permission was granted

	       // start scanning
	       let scanSub = this.qrScanner.scan().subscribe((text: string) => { 
	         //alert('Scanned something' + text); //test 
			
	         //------------------------------------ORIGINAL-----------------------------------
  			 this.storage.set('data', text);
  			 //------------------------------------ORIGINAL-----------------------------------

	         this.qrScanner.hide(); 
	         scanSub.unsubscribe(); //stop scanning

	         this.scanBarcode();
	         this.zone.run(() => { //fixes the tab active 
	         	this.navCtrl.parent.select(0);
			 });
	       });

	       // show camera preview
	       this.qrScanner.show();

	       // wait for user to scan something, then the observable callback will be called

	     } else if (status.denied) {
	       // camera permission was permanently denied
	       // you must use QRScanner.openSettings() method to guide the user to the settings page
	       // then they can grant the permission from there
	     } else {
	       // permission was denied, but not permanently. You can ask for permission again at a later time.
	     }
	  })
	  .catch((e: any) => console.log('Error is', e));
  }
}
