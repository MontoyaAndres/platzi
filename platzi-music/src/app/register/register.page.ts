import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { NavController } from "@ionic/angular";

import { AuthenticateService } from "../services/authenticate.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = "";
  successMessage = "";

  validationMessages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Ingresa un email válido." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      {
        type: "minlength",
        message: "La contraseña debe tener al menos 5 caracteres."
      }
    ],
    lastName: [
      { type: "required", message: "El apellido es requerido." },
      {
        type: "minlength",
        message: "El apellido debe tener mínimo tres letras."
      }
    ],
    firstName: [
      { type: "required", message: "El nombre es requerido." },
      {
        type: "minlength",
        message: "El nombre debe tener mínimo tres letras."
      }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
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
      ),
      firstName: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      lastName: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      )
    });
  }

  ngOnInit() {}

  tryRegister(value) {
    this.authService.registerUser(value).then(
      () => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please Log in.";
        setTimeout(() => {
          this.navCtrl.navigateForward("/login");
        }, 1500);
      },
      error => {
        this.errorMessage = error.message;
        this.successMessage = "";
      }
    );
  }

  goToLoginPage() {
    this.navCtrl.navigateBack("/login");
  }
}
