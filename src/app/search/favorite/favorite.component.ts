import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() listItems:any;
  @Output() favSearched = new EventEmitter<String>();
  constructor() { }
  ngOnInit() {
  }
  handleDelete(i){
    var local = JSON.parse(localStorage.getItem("weather"));
    delete local[this.listItems[i][0]];
    this.listItems.splice(i, 1);
    localStorage.setItem("weather", JSON.stringify(local));
  }
  handleSearch(i){
    this.favSearched.emit(this.listItems[i]);
  }

}
