import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAggregatorComponent } from './data-aggregator/data-aggregator.component';
import { FormsModule } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import { IAppState, rootReducer, INITIAL_STATE } from '../redux/store';
import { NgRedux, NgReduxModule, select } from '@angular-redux/store';

import { MatFormFieldModule, MatTableModule, MatInputModule } from '@angular/material'
@NgModule({
  declarations: [DataAggregatorComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatTableModule, MatInputModule],
  exports: [DataAggregatorComponent],
  providers: [PubNubAngular]
})
export class TwitterStreamModule {
  constructor(ngRedux: NgRedux<IAppState>) {

  }
}
