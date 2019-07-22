import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IWishList } from '../models/wish-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {

  apiUrl = `${environment.apiUrl}/api/v1/wishlists`;

  constructor(private http: HttpClient) { }

  post(data: IWishList): Observable<IWishList> {
    return this.http.post<IWishList>(`${this.apiUrl}`, data);
  }

  getByGroupUuid(groupUuid: string): Observable<IWishList[]> {
    return this.http.get<IWishList[]>(`${this.apiUrl}?groupUuid=${groupUuid}`);
  }

  delete(uuid: string): Observable<IWishList> {
    return this.http.delete<null>(`${this.apiUrl}/${uuid}`);
  }
}
