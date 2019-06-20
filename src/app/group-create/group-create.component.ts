import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {

  createGroupForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

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
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createGroupForm.invalid) {
      return;
    }

    console.info('Form valid!');
    console.info({
      value: this.createGroupForm.value,
    });
  }

}
