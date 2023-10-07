import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  registerForm!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
      Validators.pattern(/^(?=.*[A-Z]).+$/)]),

      email: new FormControl('', [Validators.required,
      Validators.email]),

      password: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{8,}$/
      )]),

      confirmPassword: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{8,}$/
      )]),

      phone: new FormControl('', [Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)])
    });
  }


  register() {
    this.isLoading = true;
    const user: User = {
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      rePassword: this.registerForm.controls['confirmPassword'].value,
      phone: this.registerForm.controls['phone'].value
    }
    this.authService.register(user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Action Succeeded',
          text: 'User Registered Successfully'
        });
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        // console.log(err);
        
        if (err.status = 409) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User already exists',
          });
        } else {
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

  arePasswordsMatched(password: string, confirmPassword: string): boolean {
    if (password != confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
