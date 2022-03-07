import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.spinner.show();
    });
    return next.handle(request).pipe(
      finalize(() => setTimeout(() => {this.spinner.hide()}))
    )
  }

}
