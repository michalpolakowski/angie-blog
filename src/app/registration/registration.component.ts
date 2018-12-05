import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  imgPath: string;
  registerForm: FormGroup;

  constructor(private registrationService: RegistrationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      
    });
  }

  onSubmit(form: NgForm) {
    this.registrationService.register(form.value)
      .subscribe(response => {
        console.log(response);
      },
        err => {
          console.log(err);
        }
      );
  }

  previewImage(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (progressEvent: ProgressEvent) => {
      this.imgPath = progressEvent.target['result'];
    };
  }
}
