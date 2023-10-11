import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
      if(localStorage.getItem('userToken') != null){
        router.navigate(['/home']);
      }
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{8,}$/
        )]),
    });
  }

  login(){
        debugger
    this.isLoading = true;
    const user: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(user).subscribe({
      next: (res: any) => {
        debugger
        Swal.fire({
          icon: 'success',
          title: 'Action Succeeded',
          text: 'You\'re now logged in'
        });
        const decodedToken = jwt_decode(res.token) as { id: string };
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userId', decodedToken.id);
        this.authService.isUserLoggedIn.next(true);
        this.router.navigate(['home']);
      },
      error: (err: any) => {
        // console.log(err);
        if(err.status == 401) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Incorrect Email or Password!',
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, Please try again!',
          });
        }
        
        this.isLoading = false;
      }
    })
  }
}

