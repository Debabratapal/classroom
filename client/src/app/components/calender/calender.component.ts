import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';


 enum Months  {
  January=0,
  February,
  March,
  April,
  May, 
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity:0})),
      transition('void <=> *', [
        animate(200)
      ]),
    ]),
    trigger('goLeft', [
      transition('void => *', [
        style({ opacity: 0, transform: "translateX(10px)" }),
        animate(200)
      ])
    ]),
    trigger('goRight', [
      transition('void => *', [
        style({ opacity: 0, transform: "translateX(-10px)" }),
        animate(200)
      ])
    ])
  ]
})
export class CalenderComponent implements OnInit {
  @Output('date') selectedDate = new EventEmitter() ;

  show:Boolean = false;
  weeks = ["Sun","Mon",'Tue',"Wed",'Thu','Fri',"Sat"];
  d = new Date()
  month:String;
  year:number;
  chunkOfDays;
  showValue:String = ''
  constructor() { }

  ngOnInit() {
    this.getAllDaysOfMonths(this.d.getMonth(), this.d.getFullYear())
    this.emitCurrentDate()
    
  }
  emitCurrentDate() {
    const d = new Date();
    this.showValue=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    this.selectedDate.emit(d.getTime())
  }

  getAllDaysOfMonths(month, year) {
    this.month = Months[this.d.getMonth()];
    this.year = year;
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
       days.push({
         date: date.getDate(), 
         day: date.getDay(),
         past: this.isPast(date)
      });
       
       date.setDate(date.getDate() + 1);
    }
    
    let chunkOfDays = [];
    let chunk = [];
    for(let i of days) {
      if(i.day != 6) {
        chunk.push(i);
      }else {
        chunk.push(i);
        chunkOfDays.push(chunk);
        chunk = [];
      }
    }
    if(chunk.length>0) {
      chunkOfDays.push(chunk);
    }

    for(let j of chunkOfDays) {
      if(j.length<7) {
        let count = 7- j.length;
        let pushMode = j[0].day == 0 ? true : false;
        for(let k=0; k<count;k++) {
          if(pushMode) {
            j.push({disable:true});
          }else {
            j.unshift({disable:true})
          }
        }
      }
    }
    this.chunkOfDays = chunkOfDays;
  }

  isPast(date) {
    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  
    if(date< today ){
      return true;
    }
    return false;
  }

  nextMonth(num:number) {
    

    this.d = new Date(this.d.getFullYear(), this.d.getMonth() + num);
    this.getAllDaysOfMonths(this.d.getMonth(), this.d.getFullYear())
  }

  onclickShow() {
    this.show = !this.show;
  }

  dateSelect(data) {
    if(data.past || !data.date) {
      this.show = false;
      return;
      
    }
    if(data.date) {
     this.showValue=`${data.date}/${this.d.getMonth()+1}/${this.d.getFullYear()}`;
     this.show = false;
     let selectedDate = new Date(this.d.getFullYear(), this.d.getMonth(), data.date).getTime().toString();
     console.log(selectedDate);
     this.selectedDate.emit(selectedDate)
    }
    return;
  }
}
