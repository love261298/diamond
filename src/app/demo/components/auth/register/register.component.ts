import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  confirmed: boolean = false;
  registerForm!: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (!this.registerForm.valid || !this.confirmed) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/auth/login'])
      },
      error: (error) => {
        console.error('Login failed', error.error);
      }
    });
  }
}
