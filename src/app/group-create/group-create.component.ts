import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {

  createGroupForm: FormGroup;
  submitted: boolean = false;
  selectedIcon: File = null;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) { }

  get f() {
    return this.createGroupForm.controls;
  }

  getFormGroupClass(): string {
    if (this.submitted && this.f.name.errors) {
      return 'is-invalid';
    }

    if (this.f.name.valid) {
      return 'is-valid';
    }

    return '';
  }

  ngOnInit() {
    this.createGroupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(48)]],
      icon: ['', [Validators.required]],
    });
  }

  onFileChanged(event) {
    this.selectedIcon = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createGroupForm.invalid) {
      return;
    }

    // need to post multipart/form-data to our server
    const formData = new FormData();
    formData.append('icon', this.selectedIcon, this.selectedIcon.name);
    formData.append('name', this.createGroupForm.get('name').value);

    this.groupService.post(formData).subscribe((group) => {
      console.log({
        group,
      });
    });
  }

}
