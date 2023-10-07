import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {
  verificationCodeForm!: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificationCodeForm = new FormGroup({
      resetCode: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const verificationCode = this.verificationCodeForm.controls['resetCode'].value;
    this.authService.verifyResetPassword(verificationCode).subscribe({
      next:(res: any) => {
        debugger
        console.log('verification-code component', res);
        this.router.navigate(['rest-password']);
      }, error:() => {}
    })
  }
}
