import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() weatherInfo:any;
  @Input() cityName:any;
  @Input() stateName:any;
  stateImg:any;
  favActive = false;

  constructor() { }
  ngOnChanges(){
    var favs = JSON.parse(localStorage.getItem('weather'));
    if( favs != null){
      this.favActive = favs[this.cityName] != null;
      console.log(favs[this.cityName]);
    }else{
      this.favActive = false;
    }
  }
  ngOnInit() {
  }
  storeURL(url:String){
    this.stateImg = url;
  }
  handleFav(){
    var favs = {};
    if(localStorage.getItem('weather') != null){
      favs = JSON.parse(localStorage.getItem('weather'));
    }
    if(this.favActive){ 
      delete favs[this.cityName];
    }else{
      favs[this.cityName] = [this.cityName, this.stateName, this.stateImg]; 
    }
    this.favActive = favs[this.cityName] != null;
    localStorage.setItem('weather', JSON.stringify(favs));
  }

}
