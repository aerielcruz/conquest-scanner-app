import { Component, ViewChild } from '@angular/core';
import { NavController, Content, List } from 'ionic-angular';
import { Platform, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{ 


  @ViewChild(Content) content: Content;
  @ViewChild(List) list: List;

  ifTest: boolean = true;

  items: string[]; //was "any"
  searchQuery: string = '';
  refresher: any;
  results: {};

  constructor(private storage: Storage, public navCtrl: NavController, private platform: Platform, public navParams: NavParams, public events: Events) {


  	this.platform.ready().then(() => {
  		//------------------------------------ORIGINAL-----------------------------------
  		this.storage.get('data').then((val) => {
			this.results = val;
		});
		//------------------------------------ORIGINAL-----------------------------------
  	
	});
  }

   
	ionViewDidEnter() 
	{
		this.storage.get('data').then((val) => {
			this.results = val;
		});
	}

	scannerPush()
	{
		this.navCtrl.push(AboutPage);
	}  

	aboutPush()
	{
		this.navCtrl.push(ContactPage);
	}  
}
