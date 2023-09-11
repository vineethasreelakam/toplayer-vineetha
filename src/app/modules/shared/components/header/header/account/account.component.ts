import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/login/services/auth/auth.service";
import { ToastrControlService } from "src/app/modules/shared/services/toastr.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  // public userName: string;
  // public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(public router: Router, private authService: AuthService, private toastr: ToastrControlService) {}

  logoutFunc() {
    this.authService.logout().subscribe((res) => {
      this.toastr.showSuccessToastr(res.message);
      localStorage.clear();
      sessionStorage.clear();
      sessionStorage.removeItem("currentUser");
      this.router.navigate(["/user/login"]);
    });
  
  }
  ngOnInit(): void {}
}
