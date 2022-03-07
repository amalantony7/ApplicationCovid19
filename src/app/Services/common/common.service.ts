import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountryDetails } from 'src/app/Models/country-details';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private coutryDetails : BehaviorSubject<CountryDetails> = new BehaviorSubject<CountryDetails>({});
  private filterVal = new ReplaySubject<any>();
  constructor(private http: HttpClient) { }

  getdashboardCovidData() {
    let api = 'https://corona.lmao.ninja/v2/all';
    return this.http.get(api).pipe(
      tap(res => res),
      catchError(this.errorHandler))
  }

  getFullCountryCovidData() {
    let api = 'https://corona.lmao.ninja/v2/countries';
    return this.http.get(api).pipe(
      tap(res => res),
      catchError(this.errorHandler))
  }

  setCountryDetails(data : CountryDetails){
    this.coutryDetails.next(data);
  }

  getCountryDetails(){
    return this.coutryDetails;
  }

  setFilterValue(filterVal: any) {
    this.filterVal.next(filterVal);
  }
  getFilterValue(): Observable<any> {
    return this.filterVal.asObservable();
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Service Error');
  }
}
