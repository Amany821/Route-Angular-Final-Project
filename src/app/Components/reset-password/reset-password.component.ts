import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
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
    this.authService.resetPassword(newUserPassword).subscribe({
      next: (res: any) => {
        debugger
        console.log('reset-password component', res);
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['/home']);
      }, error:() => {}
    })
  }
}
