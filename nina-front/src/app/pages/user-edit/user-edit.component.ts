import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/enums/UserRole';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user = new User();

  constructor(private userService : UserService,
    private toastrService : ToastrService,
    private router : Router) { }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.account;

    this.userService.getUserProfile(account).subscribe( data => {
      this.user = data;
      this.user.password = '';
    } ,error => {
      console.log('User with email ' + `${account}` + ' does not exist.')
    });
  }

  onSubmit() : void {
    this.userService.update(this.user).subscribe( data => {
      this.userService.nameTerms.next(data.firstName);
      let url = '/';
      if(this.user.userRole != UserRole.USER){
        url = '/admin';
      }
      this.toastrService.success('Succesfully updated profile!');
      this.router.navigateByUrl(url);
    },error => {
        this.toastrService.error('Error while updating user profile!');
    });
  }

}
