import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";

const { Geolocation } = Plugins;

interface CurrentCenter {
  lat: number;
  lng: number;
}

@Component({
  selector: "app-sports",
  templateUrl: "./sports.page.html",
  styleUrls: ["./sports.page.scss"]
})
export class SportsPage {
  currentCenter: CurrentCenter;
  coordinates: CurrentCenter[] = [];
  defaultZoom = 14;

  constructor() {}

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition() {
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.coordinates = [
        { lat: position.coords.latitude, lng: position.coords.longitude }
      ];
    });
  }
}
