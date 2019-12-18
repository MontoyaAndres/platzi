import { Component } from "@angular/core";
import { ModalController } from '@ionic/angular'

import { PlatziMusicService } from "../services/platzi-music.service";
import { SongsModalPage } from '../songs-modal/songs-modal.page'

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  newReleases = [];
  artists = [];
  favorites = [];
  song = {
    playing: false,
    preview_url: ""
  }
  currentSong: HTMLAudioElement;
  newTime: number;

  constructor(private musicService: PlatziMusicService, private modalController: ModalController) { }

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.newReleases = this.favorites = newReleases.albums.items;
      this.artists = this.musicService.getArtists();
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id)
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist_or_album: artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    })

    return await modal.present()
  }

  async showSongsByAlbum(album) {
    const songs = await this.musicService.getAlbumTracks(album.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.items,
        artist_or_album: album.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });

    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
    })

    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = "0.00") {
    const partTime = parseInt(time.toString().split(".")[0], 10);

    let minutes = Math.floor(partTime / 60).toString();

    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }

    let seconds = (partTime % 60).toString();

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }
}
