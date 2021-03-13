import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/enums/UserRole';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserSubscription : Subscription;
  name$;
  name : string;
  currentUser : JwtResponse;
  root = '/';
  Role = UserRole;

  isInvalid : boolean;
  //isLogout : boolean;
  //isRegistered : boolean;
  //submitted = false;
  model : any = {
    username : '',
    password : '',
    remembered : false
  };

  returnUrl = '/';

  public isMenuCollapsed = true;

  constructor(private userService : UserService, private router : Router, private activatedRoute : ActivatedRoute, public loaderService : LoaderService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.name$ = this.userService.name$.subscribe(name => this.name = name);
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(!user || user.role == this.Role.USER) {
          this.root = '/';
      }
      else {
        this.root = '/admin';
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  logout() : void {
    this.userService.logout();
  }

  onSubmit() {
    //this.submitted = true;
    this.isInvalid = false;
    this.userService.login(this.model).subscribe(jwtResponse => {
        if(jwtResponse) {
          if(jwtResponse.role != UserRole.USER) {
            this.returnUrl = '/admin';
          }
          this.model.username = '';
          this.model.password = '';
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.isInvalid = true;
        }
    });
}

}
