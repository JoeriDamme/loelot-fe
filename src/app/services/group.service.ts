import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroup } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  apiUrl = `${environment.apiUrl}/api/v1/groups`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}`);
  }

  post(data: FormData): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}`, data);
  }
}
