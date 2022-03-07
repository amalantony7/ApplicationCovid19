import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryDetails } from 'src/app/Models/country-details';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit,OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  countryCovidList : Array<any> = [];
  allCountryCovidList : Array<any> = [];
  searchKey : string = '';
  pageIndex = 0;
  lowValue = 0;
  pageSize = 30;
  highValue = 30;
  subscription : Subscription;

  constructor(private service : CommonService,
    private router : Router) { }

  ngOnInit(): void {
    this.getCountryWiseCovidList();

    this.service.getFilterValue().subscribe((response : any) => {
      this.lowValue = +response.lowValue;
      this.highValue = +response.highValue;
      this.pageIndex = +response.pageIndex;
    });

  }

  getCountryWiseCovidList(){
    this.service.getFullCountryCovidData().subscribe((response : any)=> {
      if(response){
        this.countryCovidList = this.allCountryCovidList =  response;
        this.subscription = this.service.getCountryDetails().subscribe((res:any)=>{
          if(res.isEdited){
            let countryId = res.countryId;
            let arrInd = this.allCountryCovidList.findIndex(x => x.countryInfo['_id'] == countryId);
            this.allCountryCovidList[arrInd].cases = res.cases;
            this.allCountryCovidList[arrInd].deaths = res.deaths;
            this.allCountryCovidList[arrInd].recovered = res.recovered;
            this.allCountryCovidList[arrInd].tests = res.tests;
            this.countryCovidList = this.allCountryCovidList;
          }
        })

      }else{
        console.log("Error while loading counrty wise covid api");
      }
    },error => {
      console.error("getdashboardCovidData API error",error);
      
    })
  }

  filterData(event : any){
    let filterVal = event.target.value;
    
    if(this.searchKey){
      this.searchData(this.searchKey,'self');
    }else{
      this.countryCovidList = this.allCountryCovidList;
    }

    switch(filterVal){
      case 'country' :
        this.countryCovidList = this.countryCovidList.sort((x,y)=>x.country.localeCompare(y.country));
        break;
      case 'cases' :
        this.countryCovidList = this.countryCovidList.sort((x,y)=>x.cases-y.cases);
        break;
      case 'deaths' :
        this.countryCovidList = this.countryCovidList.sort((x,y)=>x.deaths-y.deaths);
        break;
      case 'recovered' :
        this.countryCovidList = this.countryCovidList.sort((x,y)=>x.recovered-y.recovered);
        break;
      default :
      this.countryCovidList = this.allCountryCovidList;
    }
  }

  searchData(event : any,source : any){
    let searchVal = source ? event : event.srcElement.value;
    this.lowValue = 0;
    this.highValue = 30;
    this.paginator.firstPage();
    if(searchVal){
      this.countryCovidList = this.allCountryCovidList.filter((data : any)=>data.country.trim().toLowerCase().includes(searchVal.toLowerCase()) );
    }else{
      this.countryCovidList = this.allCountryCovidList;
    }
  }

  getPaginatorData(event : any) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;

    this.service.setFilterValue({
      lowValue: +this.lowValue, highValue: +this.highValue,
      pageIndex: +this.pageIndex
    });
  }

  editCountryData(data : any){
    if(data){
      let editDetails : CountryDetails = {
        countryId : data.countryInfo['_id'],
        countryName : data.country,
        cases : data.cases,
        deaths : data.deaths,
        tests : data.tests,
        recovered : data.recovered,
        isEdited : false
      }
      this.service.setCountryDetails(editDetails);
      this.router.navigate(['edit_country']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
