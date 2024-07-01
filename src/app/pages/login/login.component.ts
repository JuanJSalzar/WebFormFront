import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private serviceAccess = inject(AccessService);
  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (this.formLogin.invalid)return;

    const object: Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password,
    };

    this.serviceAccess.login(object).subscribe({
      next: (result) => {
        console.log('Login successful');
        localStorage.setItem('token', result.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  register() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  }
}
