import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoadingService
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.loaderService.start();
    const userEmail = this.resetPasswordForm.controls['email'].value;

    this.authService.forgetPassword(userEmail).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        debugger
        console.log('forget-password component', res);
        this.router.navigate(['verification-code']);
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
