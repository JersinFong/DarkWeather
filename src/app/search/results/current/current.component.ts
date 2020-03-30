import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit, OnChanges {
  @Input() weatherInfo:{};
  @Input() cityName:String;
  @Input() stateName:String;
  @Output() stateImgCreated = new EventEmitter<String>();
  stateImgURL:String;
  constructor(private http: HttpClient) { }
  ngOnChanges(){
    if(this.stateName != undefined){
      this.http.get('http://csci571hw8-env.mnngic9n8v.us-east-2.elasticbeanstalk.com/api/weather/img/'+this.stateName).subscribe (responseData => {
        this.stateImgURL = responseData['data']['items'][0]['link'];
        this.stateImgCreated.emit(this.stateImgURL);
      });
    }
  }
  ngOnInit() {
  }

}
