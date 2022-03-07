import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  covidData : any;
  constructor(private service : CommonService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(){
    this.service.getdashboardCovidData().subscribe((response : any)=> {
      if(response){
        this.covidData = response;
      }else{
        console.log("Error while loading dashboad api");
      }
    },error => {
      console.error("getdashboardCovidData API error",error);
      
    })
  }

}
