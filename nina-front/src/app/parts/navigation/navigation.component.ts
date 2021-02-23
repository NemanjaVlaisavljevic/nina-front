import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/enums/UserRole';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit , OnDestroy {


  currentUserSubscription : Subscription;
  name$;
  name : string;
  currentUser : JwtResponse;
  root = '/';
  Role = UserRole;

  constructor(private userService : UserService ,
    private router : Router) {

     }

  ngOnInit(): void {
    this.name$ = this.userService.name$.subscribe(name => this.name = name);
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(!user || user.role == this.Role.USER){
          this.root = '/';
      }else{
        this.root = '/admin';
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
   }

   logout() : void {
     this.userService.logout();
     this.router.navigate(['/login'] , {queryParams : {logout : 'true'}});
   }

}
