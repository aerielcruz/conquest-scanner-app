import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { NavParams, Content } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  @ViewChild(Content) content: Content;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  thisPage = 0;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, private ref: ApplicationRef) {
	
  }

  ionViewWillLeave()
  {
	this.ref.tick();
  }
}
