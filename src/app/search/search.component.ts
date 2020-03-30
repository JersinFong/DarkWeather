import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {states} from './states'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  statesJson = states.States;
  defaultOption = 'default';
  weatherInfo : {};
  cityInput:any;
  cityName:String;
  stateName:String;
  citys = [];
  listItems =  [];
  allowInput = true;
  showResult = false;
  showFavResult = false;
  error = false;
  showFav = false;
  progress = false;
  constructor(private http: HttpClient) { 

  }
  ngOnInit() {

  }
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      map(term => term.length < 0 ? []: this.citys)
  )
  hadnleOninput(){
    if(this.cityInput != ''){
      this.http.get('http://csci571hw8-env.mnngic9n8v.us-east-2.elasticbeanstalk.com/api/auto/' + this.cityInput)
      .subscribe(responseData=>{
        var newCitys = [];
        responseData['data']['predictions'].forEach(element => {
          newCitys.push(element['structured_formatting']['main_text']);
        });
        this.citys = newCitys;
      });
    }
  }
  onSubmit(form: NgForm,t){
    t.select('results');
    this.progress = true;
    this.showResult = false;
    if(form.value.currentLoc === true){
      this.http.get('http://ip-api.com/json').subscribe(responseData => {
        var loc = responseData['lat'] + "," + responseData['lon'];
        this.cityName = responseData['city'];
        this.stateName =  responseData['region'];
        this.fetchWeather(loc, true);
      });
    }else{
      this.cityName = form.value.city;
      this.stateName = form.value.state;
      var state = form.value.state == 'default' ? '' : form.value.state;
      var address = form.value.street + ',' + form.value.city + ',' + state;
      this.fetchLocation(address, true);
    }
  }
  fetchLocation(address:any, isSearch:boolean){
    this.http.get('http://csci571hw8-env.mnngic9n8v.us-east-2.elasticbeanstalk.com/api/weather/location/'+ address).subscribe(responseData =>{
      responseData = responseData['data'];
      if(responseData['status'] !== "ZERO_RESULTS"){
        var loc = responseData['results'][0]['geometry']['location']['lat'] + ","
                  + responseData['results'][0]['geometry']['location']['lng'];
        this.fetchWeather(loc, isSearch);
      }else{
        this.error = true;
        this.progress = false;
      }
    });
  }
  fetchWeather(loc:string, isSearch:boolean){
    this.http.get('http://csci571hw8-env.mnngic9n8v.us-east-2.elasticbeanstalk.com/api/weather/' + loc).subscribe(ResponseData => {
      this.weatherInfo = ResponseData['data'];
      this.progress = false;
      if(isSearch)this.showResult = true;
      else this.showFavResult = true;
    }, error=>{
      console.log("There was an error when fecting data from dark weather api on the server", error);
    });
  }
  handleCheck(event:any){
    if(event.target.checked == true){
      this.allowInput = false;
    }else{
      this.allowInput = true;
    }
  }
  handleClear(t){
    this.allowInput = true;
    this.error = false;
    this.showResult = false;
    this.showFavResult = false;
    this.showFav = false;
    this.progress = false;
    t.select('results');
  }
  // beforeChange($event: NgbTabChangeEvent) {
  //   if ($event.nextId === 'favorite') {

  //   }
  // }
  onFav(e){
    if(e.target.id === 'favorite'){
      this.showFavResult = false;
      this.showFav = true;
      var items = JSON.parse(localStorage.getItem('weather'));
      var newList = [];
      for (var key in items) {
        newList.push(items[key]);
      }
      this.listItems = newList;
    }
  }
  onFavSearch(favCity){
    this.showFav = false;
    this.showFavResult = false;
    this.showResult = false;
    this.progress= true;
    this.fetchLocation(favCity[0], false);
    this.cityName = favCity[0];
    this.stateName = favCity[1];
  }

}

 
