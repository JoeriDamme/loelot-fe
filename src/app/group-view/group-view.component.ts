import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '../models/group';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { WishListService } from '../services/wish-list.service';
import { IWishList } from '../models/wish-list';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {

  group: IGroup = null;
  addToWishList: FormGroup;
  submittedWishList: boolean = false;
  wishLists: IWishList[] = [];
  userUuid: string;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private wishListService: WishListService,
    private authenticationService: AuthenticationService,
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

    const decodedToken = this.authenticationService.getDecodedToken();
    this.userUuid = decodedToken.data.uuid;

    const query = 'include=admin,creator,users';
    this.groupService.get(uuid, query).subscribe((data: IGroup) => {
      this.group = data;
      this.getWishListsForGroup();
    });

    // setting up add wish list form
    this.addToWishList = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
    });
  }

  getWishListsForGroup() {
    const groupUuid = this.group.uuid;

    this.wishListService.getByGroupUuid(groupUuid).subscribe((wishLists) => {
      this.wishLists = wishLists;
    });
  }

  deleteWishList(uuid: string) {
    this.wishListService.delete(uuid).subscribe(() => {
      this.getWishListsForGroup();
    });
  }

  onSubmitWishList() {
    this.submittedWishList = true;

        // stop here if form is invalid
    if (this.addToWishList.invalid) {
      return;
    }

    const data = this.addToWishList.value;
    data.groupUuid = this.group.uuid;
    data.rank = 1;

    this.wishListService.post(this.addToWishList.value).subscribe((wishList) => {
      this.getWishListsForGroup();
      this.addToWishList.reset();
      this.submittedWishList = false;
    });
  }

}
