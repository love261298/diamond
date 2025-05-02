import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;
            
            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.setRole(response.role);
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
