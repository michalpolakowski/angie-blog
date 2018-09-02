import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public user: any;
  constructor(public _authenticationService: AuthenticationService) { }
  @ViewChild('loginModal') loginModal: ElementRef;

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
    this._authenticationService.IsAuthenticated();
  }
  login() {
    this._authenticationService.login({'username': this.user.username, 'password': this.user.password})
      .subscribe(() => this.loginModal.nativeElement.modal('hide'));
  }

  logout() {
    this._authenticationService.logout();
  }
}
