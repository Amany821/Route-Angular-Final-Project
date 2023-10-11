import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {
  verificationCodeForm!: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoadingService
  ) { }

  ngOnInit(): void {
    this.verificationCodeForm = new FormGroup({
      resetCode: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.loaderService.start();
    const verificationCode = this.verificationCodeForm.controls['resetCode'].value;
    this.authService.verifyResetPassword(verificationCode).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        debugger
        console.log('verification-code component', res);
        this.router.navigate(['rest-password']);
      }, error: (err: any) => {
        if(err.status == 400) {
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
