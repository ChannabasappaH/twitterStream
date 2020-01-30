// Imports for this components
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ITwitterData } from '../interfaces/ITwitterData';
import { AppSettings } from 'src/app/app-settings';
import { TwitterService } from 'src/app/services/twitter.service';

// external import statements
import { MatTableDataSource } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';

// imports form redux
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../redux/store';
import { REMOVE_TWITTERDATA } from '../../redux/actions';


const TWITTER_DATA: ITwitterData[] = [];

@Component({
  selector: 'data-aggregator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-aggregator.component.html',
  styleUrls: ['./data-aggregator.component.css']
})
export class DataAggregatorComponent implements OnDestroy {
  @select() twitterData: any;
  @select() lastUpdate: any;

  public tableData: ITwitterData[] = [];
  public tweeterCounter: number = 0;
  public displayedColumns: string[] = ['date', 'username', 'place', 'country', 'hashTags', 'totalHashTags'];
  public dataSource: MatTableDataSource<ITwitterData> = new MatTableDataSource(TWITTER_DATA);
  private _totalHashtags: number = 0;
  private _subscription: Subscription;
  private totalTags: number = 0;
  private avgTagCount: number[] = [];
  private avgTweets: number = 0;


  constructor(public cdRef: ChangeDetectorRef, public tService: TwitterService, public ngRedux: NgRedux<IAppState>) {
    this.subscribeLiveStream();

  }

  public subscribeLiveStream(): void {
    this._subscription = this.tService.getStreamingData().subscribe({
      next: response => {
        // below line is for testing purpose only
        //  console.log('retrivedData', response);
        this.bindDataToTable(response);
      }
    });
    this._subscription = interval(AppSettings.avgTweetsInterval).subscribe(val => {
      this.calculateAverageTweets();
    });
  }

  public bindDataToTable(response: any): void {
    // this.zone.run(() => {
    TWITTER_DATA.push({
      country: response.place.country,
      date: response.timestamp_ms,
      place: response.place.name,
      username: response.user.name,
      hashTags: this.getHashTags(response.entities.hashtags),
      totalHashTags: this._totalHashtags
    });
    this.dataSource = new MatTableDataSource(TWITTER_DATA);

    this.cdRef.detectChanges();
    this.totalTags++;
    this._totalHashtags = 0;
  }

  public calculateAverageTweets() {
    this.avgTagCount.push(this.totalTags);
    this.totalTags = 0;
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    this.avgTweets = arrAvg(this.avgTagCount);
    // console.log("this.avgTweets", this.avgTweets);
  }

  public getHashTags(hashtags: any): string {
    let allHastags: string[] = [];
    hashtags.forEach(element => {
      this._totalHashtags++;
      allHastags.push(element.text);
    });
    return allHastags.toString();
  }

  public clearTwitterData(): void {
    this.dataSource.data.length = 0;
    AppSettings.avgTweetsInterval = 10000;
    this.avgTweets = 0;
    //  this.ngRedux.dispatch({ type: REMOVE_TWITTERDATA });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
