import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { AccessService } from '../../services/access.service';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private serviceAccess = inject(AccessService);
  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    identificationNumber: ['', Validators.required],
    email: ['', Validators.required],
    identificationType: ['', Validators.required],
  });
  
  register(){
    
    if(this.formRegister.invalid)return;
  
    const object: User = {
      username: this.formRegister.value.username,
      password: this.formRegister.value.password,
      firstname: this.formRegister.value.firstname,
      lastname: this.formRegister.value.lastname,
      identificationNumber: this.formRegister.value.identificationNumber,
      email: this.formRegister.value.email,
      identificationType: this.formRegister.value.identificationType,
    };
  
    console.log(object);

    this.serviceAccess.register(object).pipe(first()).subscribe({
      next: (result) => {
        console.log('Register successful');
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Register failed:', error);
      }
    });
  }  

  goBack(){
    this.router.navigate(['']);
  }
}
