import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryDetails } from 'src/app/Models/country-details';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-edit-country-details',
  templateUrl: './edit-country-details.component.html',
  styleUrls: ['./edit-country-details.component.scss']
})
export class EditCountryDetailsComponent implements OnInit,OnDestroy {

  editCountryForm : FormGroup;
  editData : CountryDetails;
  subscription : Subscription;

  constructor(private formBuilder : FormBuilder,
    private service : CommonService,
    private router : Router) { }

  ngOnInit(): void {
    this.subscription = this.service.getCountryDetails().subscribe((response : any)=>{
      this.editData = response;
    })
    this.getEditFormDetails(this.editData);
  }

  getEditFormDetails(editData? : any){
    this.editCountryForm = this.formBuilder.group({
      cases : [editData ? editData.cases : '',[Validators.required,Validators.pattern(/^\d+$/)]],
      deaths : [editData ? editData.deaths : '',[Validators.required,Validators.pattern(/^\d+$/)]],
      recovered : [editData ? editData.recovered : '',[Validators.required,Validators.pattern(/^\d+$/)]],
      tests : [editData ? editData.tests : '',[Validators.required,Validators.pattern(/^\d+$/)]],
    })
  }

  redirectBack(){
    this.router.navigate(['countries'])
  }

  submitData(){
    if(this.editCountryForm.valid){
      let data = this.editCountryForm.getRawValue();
      this.editData['cases'] = data.cases;
      this.editData['deaths'] = data.deaths;
      this.editData['recovered'] = data.recovered;
      this.editData['tests'] = data.tests;
      this.editData['isEdited'] = true;
      this.service.setCountryDetails(this.editData);
      this.router.navigate(['countries'])
    }
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
