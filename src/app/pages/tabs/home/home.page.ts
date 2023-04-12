import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  bannerConfig: SwiperOptions;
  banners: any [] = [];
  store_types: any [] = [];
  updateStatus: string = 'Update not started';
  newChannel: string = 'Production';
  channelCurrent: string = 'Production';

  constructor(private _deploy: Deploy) { }


  ngOnInit() {
    this.banners = [
      {banner: 'assets/imgs/1.jpg'},
      {banner: 'assets/imgs/2.jpg'},
      {banner: 'assets/imgs/3.jpg'},
      {banner: 'assets/imgs/4.jpg'},
    ];
    this.store_types = [
      { id: 1, name: 'Restaurant', icon: 'shop2.jpg' },
      { id: 2, name: 'Grocery', icon: 'grocery.jpg' },
      { id: 3, name: 'Medicines', icon: 'med2.jpg' },
      { id: 4, name: 'Paan Shop', icon: 'paan.jpg' },
      { id: 5, name: 'Meat & Fish', icon: 'meat.jpg' },
      { id: 6, name: 'Gifts', icon: 'gifts.jpg' },
      { id: 7, name: 'Pet Supplies', icon: 'pet_asset.jpg' }
    ];
  }

  async performManualUpdate() {
    this.updateStatus = 'Checking for Update';
    const update = await this._deploy.checkForUpdate()
    if (update.available){
      this.updateStatus = 'Update found. Downloading update';
      await this._deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      this.updateStatus = 'Update downloaded. Extracting update';
      await this._deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      console.log('Reloading app');
      this.updateStatus = 'Update extracted. Reloading app';
      await this._deploy.reloadApp();
    } else {
      console.log('No update available');
      this.updateStatus = 'No update available';
    }
   }


  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
    };
  }

}
