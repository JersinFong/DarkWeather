import { Component, OnInit, Input,OnChanges} from '@angular/core';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit, OnChanges{
  @Input() hourly:{};
  selectedOption = 'temperature';
  yLables = {
    "temperature":"Fahrenheit",
    "pressure" :"Millibars", 
    "humidity": "%Humidity",
    "ozone":"Dobson Units",
    "visibility":"Miles",
    "windSpeed":"Miles per hour"
  }
  barChartOptions:any;
  barChartLabels = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];
  
  constructor() { 
  }
  ngOnInit() {
  }
  ngOnChanges(){
    this.buildChartData();
  }
  handleChange(){
    this.buildChartData();
  }
  buildChartData(){
    var newOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        onClick: (e) => e.stopPropagation()
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time difference form current hour',
            fontSize: '14',
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.yLables[this.selectedOption],
            fontSize: '14',
          }
        }]
      } 
    };
    var newdata = {
      "data":[],
      "label": this.selectedOption,
      "backgroundColor": "#A5D0EE",
      "hoverBackgroundColor": "#5D87A7"
    }
    for(var i = 0; i < 24; i++){
      newdata.data.push(this.hourly['data'][i][this.selectedOption]);
    }
    this.barChartOptions = newOptions;
    this.barChartData.pop();
    this.barChartData.push(newdata);
  }

}
