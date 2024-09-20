import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)

  form = this.formBuilder.nonNullable.group({
    email: ['email@gmx.com', [Validators.required, Validators.email]],
    password: ['123456789', [Validators.required, Validators.minLength(4)]]
  });
  error = '';

  constructor(private authService: AuthService, private router: Router) {}
 
  onSubmit() {
    console.log('LOGIN : ', this.form.value)
    const {email, password} = this.form.getRawValue();
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('LOGIN SUCCESS')
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log('LOGIN ERROR', err)
        this.error = 'User not found or invalid credentials!' 
      }
    });
  }
  
  createAccount() {
    console.log('CREATE ACCOUNT : ', this.form.value)

    const {email, password} = this.form.getRawValue();

    this.authService.createAccount(email, password).subscribe({
      next: (res) => {
        console.log('CREATE ACCOUNT SUCCESS')
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log('CREATE ACCOUNT ERROR')
        this.error = 'This email is used, try a new one!' 
      }
    });
  }
}
