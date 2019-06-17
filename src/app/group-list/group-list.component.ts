import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { IGroup } from '../models/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  public groups: IGroup[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getAll().subscribe((data: IGroup[]) => this.groups = data);
  }

}
