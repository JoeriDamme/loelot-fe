import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showError() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }
}
