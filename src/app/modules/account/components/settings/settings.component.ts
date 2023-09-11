import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingOptions = [
    {
      name: 'Change Password',
      url: '/account/change-password',
      icon: 'fa fa-lock',
    },
    { name: 'Change Plan', url: '/plan', icon: 'fa fa-refresh' },
    { name: 'Add Sub Account', url: '/account/sub-account-list', icon: 'fa fa-plus-square-o' },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
