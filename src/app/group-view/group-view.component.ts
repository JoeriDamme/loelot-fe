import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '../models/group';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {

  group: IGroup = null;
  addToWishList: FormGroup;
  submittedWishList: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
  ) { }

  get f() {
    return this.addToWishList.controls;
  }

  getFormGroupClass(formfield: string): string {
    if (this.submittedWishList && this.f[formfield].errors) {
      return 'is-invalid';
    }

    if (this.f[formfield].valid) {
      return 'is-valid';
    }

    return '';
  }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      // show 404
    }

    const query = 'include=admin,creator,users';
    this.groupService.get(uuid, query).subscribe((data: IGroup) => this.group = data);

    // setting up add wish list form
    this.addToWishList = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
    });
  }

  onSubmitWishList() {
    this.submittedWishList = true;
    console.log(this.addToWishList.value);
  }

}
