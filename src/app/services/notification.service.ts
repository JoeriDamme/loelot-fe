import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showError(title: string, message: string) {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-full-width',
    });
  }
}
