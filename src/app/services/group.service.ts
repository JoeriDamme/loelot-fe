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

  getAll(query: string = ''): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}?${query}`);
  }

  get(uuid: string, query: string = ''): Observable<IGroup> {
    return this.http.get<IGroup>(`${this.apiUrl}/${uuid}?${query}`);
  }

  post(data: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}`, data);
  }
}
