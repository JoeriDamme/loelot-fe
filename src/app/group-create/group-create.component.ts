import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {

  createGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createGroupForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(6), Validators.maxLength(48)],
    });
  }

  onSubmit() {
    console.log('onSubmit clicked!');
  }

}
