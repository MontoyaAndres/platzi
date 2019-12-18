import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { IntroGuard } from "./guards/intro.guard";
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "intro",
    loadChildren: () =>
      import("./intro/intro.module").then(m => m.IntroPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./menu/menu.module").then(m => m.MenuPageModule),
    canActivate: [LoginGuard, IntroGuard]
  },
  {
    path: "songs-modal",
    loadChildren: () => import("./songs-modal/songs-modal.module").then( m => m.SongsModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
