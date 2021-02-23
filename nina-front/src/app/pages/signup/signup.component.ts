import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router : Router) {
      this.user = new User();
     }


  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.signup(this.user).subscribe(data => {
      this.router.navigate(['/login'] , {queryParams : {registered : 'true'}});
    },error => {
        {};
    });
  }

}
