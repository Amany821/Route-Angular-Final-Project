import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(''),
      newPassword: new FormControl('')
    });
  }

  onSubmit() {
    const newUserPassword: User = {
      email: this.resetPasswordForm.controls['email'].value,
      newPassword: this.resetPasswordForm.controls['newPassword'].value
    }
    this.authService.resetPassword(newUserPassword).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res: any) => {
        debugger
        console.log('reset-password component', res);
        const decodedToken = jwt_decode(res.token) as { id: string };
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userId', decodedToken.id);
        this.authService.isUserLoggedIn.next(true);
        this.router.navigate(['home']);
      }, error: (err: any) => {
        if(err.status == 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message
          });
        }
      }
    })
  }
}
