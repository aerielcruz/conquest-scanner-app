import { Component, Pipe, PipeTransform, NgZone, ViewChild, ApplicationRef } from '@angular/core';
import { NavController, Content, List } from 'ionic-angular';
import { Platform, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { NgPipesModule } from 'ngx-pipes'; //pipe to use "reverse" for the array

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{ //added "implements PipeTransform"


  @ViewChild(Content) content: Content;
  @ViewChild(List) list: List;

  ifTest: boolean = true;

  items: string[]; //was "any"
  searchQuery: string = '';
  refresher: any;
  results: {};

  constructor(private storage: Storage, public navCtrl: NavController, private platform: Platform, public navParams: NavParams, private ref: ApplicationRef, public events: Events) {


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
