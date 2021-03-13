import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User;
  secondPassword : string;

  constructor(private userService : UserService,
    private router : Router,
    private toastrService : ToastrService) {
      this.user = new User();
     }


  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.signup(this.user).subscribe(data => {
      this.router.navigate(['/'] , {queryParams : {registered : 'true'}});
      this.toastrService.success('Successful registration , please check your email to activate account');
    },error => {
        {};
    });
  }

}
