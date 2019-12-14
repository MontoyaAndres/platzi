import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { AuthenticateService } from "../services/authenticate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = "";

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  validationMessages = {
    email: [
      { type: "required", message: "El email es requerido." },
      { type: "pattern", message: "Por favor ingrese un email válido" }
    ],
    password: [
      { type: "required", message: "El password es requerido." },
      {
        type: "minlength",
        message: "El password debe de tener al menos 5 caracteres"
      }
    ]
  };

  ngOnInit() {}

  async loginUser(value) {
    this.authService.loginUser(value).then(
      res => {
        this.errorMessage = "";
        this.storage.set("isLogged", true);
        this.navCtrl.navigateForward("/menu/home");
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward("/register");
  }
}
