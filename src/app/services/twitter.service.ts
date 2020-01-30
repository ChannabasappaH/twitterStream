import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { Observable } from 'rxjs/internal/observable'
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  public pubNub: PubNubAngular

  constructor(public _pubNub: PubNubAngular) {
    this.pubNub = _pubNub;
    this.initilizePubNubSettings();
  }

  public initilizePubNubSettings(): void {
    this.pubNub.init({
      subscribeKey: AppSettings.subscriber,
      ssl: true
    });

    this.pubNub.subscribe({
      channels: [AppSettings.channel],
      withPresence: true
    });
  }

  public getStreamingData(): Observable<any> {
    const observable = Observable.create(observer => {
      this.pubNub.addListener({
        message: function (message: any) {
          if (message && message.message.entities.hashtags.length > 0) {
            observer.next(message.message);
          }
        }
      });
    });
    return observable;
  }
}
