import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  title = 'push-notifications-5';
  readonly VAPID_PUBLIC_KEY  = "BFzrPDrcuuo8yO1fumJ_ZoD1LnWMra_qO8ZUbxmTQ0-UrBoyeyv0wIQdXNulWwfmpb5lxREaZCRxEc73A4kjAOM";

  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate
  ) {

  }

  ngOnInit(): void {
    this.updateClient();
    this.pushSubscription();
  }

  updateClient() {
    this.swUpdate.versionUpdates.subscribe( event => {
      if (event.type === 'VERSION_READY') {
        if (confirm('Update to latest Application')) {
          window.location.reload();
        }
      }
    });
  }

  pushSubscription() {
    if(this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then(sub => {
        console.log(JSON.stringify(sub));
      }).catch(err => { 
        console.error("Could not subscribe to notificationss", err)
      });
    } else {
      console.log('Service worker is not initiated');
    }
  }
}
