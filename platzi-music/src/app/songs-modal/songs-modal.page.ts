import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-songs-modal",
  templateUrl: "./songs-modal.page.html",
  styleUrls: ["./songs-modal.page.scss"]
})
export class SongsModalPage implements OnInit {
  songs = [];
  artist = "";

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    this.artist = this.navParams.data.artist;
  }

  ngOnInit() {}

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }
}
