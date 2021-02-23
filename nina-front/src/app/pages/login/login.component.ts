import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/enums/UserRole';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalid : boolean;
  isLogout : boolean;
  isRegistered : boolean;
  submitted = false;
  model : any = {
    username : '',
    password : '',
    remembered : false
  };

  returnUrl = '/';

  constructor(private userService : UserService ,
    private router : Router , private activatedRoute : ActivatedRoute,
    private toastrService : ToastrService) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.queryParamMap;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
    this.isRegistered = params.has('registered');
    if(this.isLogout == true){
      this.toastrService.success('Succesfully logged out.')
    }
    if(this.isRegistered == true){
      this.toastrService.success('Successfull registration , pleace check your email to activate your account.');
    }
  }

  onSubmit() {
      this.submitted = true;
      this.userService.login(this.model).subscribe(jwtResponse => {
          if(jwtResponse){
            if(jwtResponse.role != UserRole.USER){
              this.returnUrl = '/admin';
            }
            this.router.navigateByUrl(this.returnUrl);
          }else{
            this.isLogout = false;
            this.isInvalid = true;
          }
      });
  }

  fillLoginFields(username : string , password : string){
    this.model.username = username;
    this.model.password = password;
    this.onSubmit();
  }

}
