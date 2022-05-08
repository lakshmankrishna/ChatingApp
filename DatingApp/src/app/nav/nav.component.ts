import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  user: any = {};
  baseUrl = "https://localhost:5001/api/users";
  constructor(private http: HttpClient, public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public login() {
    this.accountService.login(this.model).subscribe(response => {
      this.accountService.isAuthenticated = true;
      this.toastr.success('Login Success!')
      this.router.navigateByUrl('/members');
    },
      error => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }

  public logout() {
    this.toastr.error('Logout Success!');
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  public getUsers() {
    return this.http.get(this.baseUrl).subscribe(user => {
      user = this.user;
    },
      error => {
        this.toastr.error(error.error);
      }
    )
  }
}
