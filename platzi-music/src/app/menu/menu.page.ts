import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: "Mensajes",
      url: "/menu/mensajes",
      icon: "mail-open"
    },
    {
      title: "Notificaciones",
      url: "/menu/notificaciones",
      icon: "notifications"
    },
    {
      title: "Videos",
      url: "/menu/videos",
      icon: "videocam"
    },
    {
      title: "Lugares",
      url: "/menu/lugares",
      icon: "pin"
    },
    {
      title: "Configuraciones",
      url: "/menu/settings",
      icon: "settings"
    }
  ];
  selectedPath = "";

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private menu: MenuController
  ) {}

  ngOnInit() {}

  closeMenu() {
    this.menu.close();
  }

  async logout() {
    await this.storage.set("isLogged", false);
    this.navCtrl.navigateRoot("login");
  }
}
