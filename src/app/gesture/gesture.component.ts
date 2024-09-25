import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.scss'],
})
export class GestureComponent implements OnInit {
  profiles: Profile[] = [
    {
      id: 1,
      src: '../assets/images/png.jpg',
      name: 'Pragati',
      details: '27 Yrs, 5 ft 5 in, MBBS, Doctor, Chennai',
      isFavorite: false,
    },
    {
      id: 2,
      src: '../assets/images/pmg3.jpg',
      name: 'Kajal',
      details: '29 Yrs, 6 ft, Engineer, Mumbai',
      isFavorite: false,
    },
    {
      id: 3,
      src: '../assets/images/png 4.jpg',
      name: 'Anu',
      details: '29 Yrs, 6 ft, Nurse, Mumbai',
      isFavorite: false,
    },
    {
      id: 4,
      src: '../assets/images/pmg3.jpg',
      name: 'BanuMathi',
      details: '29 Yrs, 6 ft, Engineer, Mumbai',
      isFavorite: false,
    },
    {
      id: 5,
      src: '../assets/images/png 4.jpg',
      name: 'Anushya',
      details: '29 Yrs, 6 ft, Nurse, Mumbai',
      isFavorite: false,
    },
  ];

  currentProfileIndex = 0;

  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.profileService.setProfiles(this.profiles);
    this.loadResponses();
  }

  get currentProfile() {
    return this.profiles[this.currentProfileIndex];
  }

  nextProfile() {
    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profiles.length;
  }

  prevProfile() {
    if (this.currentProfileIndex === 0) {
      // Navigate to home if the current index is 0
      this.router.navigate(['']); // Change 'home' to your actual home route
    } else {
      // Otherwise, move to the previous profile
      this.currentProfileIndex = (this.currentProfileIndex - 1 + this.profiles.length) % this.profiles.length;
    }
  }

  toggleFavorite(profile: Profile) {
    profile.isFavorite = !profile.isFavorite;
    const message = profile.isFavorite
      ? `${profile.name} added to favorites.`
      : `${profile.name} removed from favorites.`;
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.saveFavorites();
  }

  onYesClick() {
    const message = `You liked ${this.currentProfile.name}.`;
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.saveResponse('Yes');
    this.nextProfile();
  }

  onNoClick() {
    const message = `You disliked ${this.currentProfile.name}.`;
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.saveResponse('No');
    this.nextProfile();
  }



  saveResponse(response: string) {
    const responses = JSON.parse(localStorage.getItem('responses') || '[]');
    responses.push({ profileId: this.currentProfile.id, response });
    localStorage.setItem('responses', JSON.stringify(responses));
  }

  loadResponses() {
    const responses = JSON.parse(localStorage.getItem('responses') || '[]');
    // You can utilize the responses as needed
    console.log(responses); // This will log the responses for debugging
  }

  saveFavorites() {
    const favorites = this.profiles.filter((profile) => profile.isFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.profiles.forEach((profile) => {
      profile.isFavorite = !!favorites.find((fav: { name: string }) => fav.name === profile.name);
    });
  }

  onMenuClick() {
    this.router.navigate(['profile', { id: this.currentProfileIndex }]);
    console.log('Menu clicked');
  }
}
