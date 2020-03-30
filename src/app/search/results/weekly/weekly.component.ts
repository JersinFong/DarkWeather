import { Component, OnInit, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
Chart.plugins.unregister(ChartDataLabels);//forbid ChartDataLabels to be applied to all charts
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .modal-content{
      background-color: #92CBF1;
    }
  `]
})
export class WeeklyComponent implements OnInit, OnChanges {
  @Input() weatherInfo = 'weatherInfo';
  @Input() cityName:String;
  barChartLabels = [];
  barChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [ChartDataLabels];
  barChartData = [ 
    { 
      data:[],
      label : "Day wise temperature range",
      backgroundColor: "#A5D0EE",
      hoverBackgroundColor: "#5D87A7"
    }
  ];
  barChartOptions = {
    aspectRatio:1.6,
    responsive:true,
    title: {
      display: true,
      text: 'Weekly Weather',
      fontSize: '25',
      fontStyle:'bold',
    }, 
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Temperatrue in Fahrenheit',
          fontSize: '14',
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Days",
          fontSize: '14',
        }
      }]
    },
    plugins: {
      datalabels: {
        labels:{
          left:{
            anchor: 'start',
            align: 'start',
            formatter: function(value, context) {
              return Math.round(value[0]);
            } 
          },
          right:{
            anchor: 'end',
            align: 'end',
            formatter: function(value, context) {
              return Math.round(value[1]);
            } 
          }
        }

      }
    },
  
  };
  activIdx = 0;
  newWeather:{ };
  newDataReady = true;
  constructor(private modalService: NgbModal, private http: HttpClient) { }
  open(content) {
    this.modalService.open(content);
  }
  chartClicked(e: any, content:any): void {
    if(e.active[0]!= null){
      this.activIdx = e.active[0]._index;
      var url = this.weatherInfo['latitude'] + ',' + this.weatherInfo['longitude']
                + ',' + this.weatherInfo['daily']['data'][this.activIdx]['time'];
      this.http.get('http://csci571hw8-env.mnngic9n8v.us-east-2.elasticbeanstalk.com/api/weather/' + url).subscribe(ResponseData => {
        this.newWeather = ResponseData['data'];
        this.open(content);
      }, error=>{
        console.log("There was an error when fecting data from dark weather api on the server", error);
      });
    }
  }   
  ngOnInit() {
  }
  ngOnChanges(){
    this.barChartData[0]['data'] = [];
    this.barChartLabels = [];
    var daily = this.weatherInfo['daily']['data'];
    daily.forEach(element => {
      this.barChartLabels.push(this.getDate(element['time']));
      this.barChartData[0]['data'].push([element['temperatureLow'], element['temperatureHigh']])
    });
  }
  getDate(time:any){
    var date = new Date(time * 1000);
    var formatted = date.getDate() + '/' +  (date.getMonth()+1) + '/' + date.getFullYear();
    return formatted;
  }
  get_icon = (icon:String)=>{
    if(icon === 'clear-day' || icon === 'clear-night'){
        return "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
    }else if(icon==='rain'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png';
    }else if(icon==='snow'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png';
    }else if(icon==='sleet'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png';
    }else if(icon==='wind'){
        return 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png';
    }else if(icon==='fog'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png';
    }else if(icon==='cloudy'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png';
    }else if(icon==='partly-cloudy-day' || icon === 'partly-cloudy-night'){
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png';
    }else{
        return 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png';
    }
  } 
}
