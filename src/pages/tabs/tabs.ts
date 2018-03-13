import { Component, NgZone, ViewChild, ApplicationRef } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { Platform, NavParams, Content } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  @ViewChild(Content) content: Content;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  thisPage = 0;

  constructor(private qrScanner: QRScanner, public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App, private storage: Storage, private platform: Platform, private sqlite: SQLite, public navParams: NavParams, private zone: NgZone, private ref: ApplicationRef) {
	
  }

  ionViewWillLeave()
  {
	this.ref.tick();
  }
}
