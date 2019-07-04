import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '../models/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {

  group: IGroup = null;

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      // show 404
    }

    const query = 'include=admin,creator,users';
    this.groupService.get(uuid, query).subscribe((data: IGroup) => this.group = data);
  }

}
