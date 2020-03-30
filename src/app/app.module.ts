import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './search/results/results.component';
import { CurrentComponent } from './search/results/current/current.component';
import { HourlyComponent } from './search/results/hourly/hourly.component';
import { WeeklyComponent } from './search/results/weekly/weekly.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FavoriteComponent } from './search/favorite/favorite.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    CurrentComponent,
    HourlyComponent,
    WeeklyComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
