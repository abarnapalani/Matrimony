import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profiles = [
    {
      id: 1,
      src: '../assets/images/png 4.jpg',
      name: 'Pragati',
      details: '27 Yrs, 5 ft 5 in, MBBS, Doctor, Hindu, Chennai.'
    },
    {
      id: 2,
      src: '../assets/images/pmg3.jpg',
      name: 'Swati',
      details: '28 Yrs, 5 ft 6 in, Engineer, Hindu, Delhi.'
    },
    {
      id: 3,
      src: '../assets/images/png.jpg',
      name: 'Priya',
      details: '26 Yrs, 5 ft 4 in, Lawyer, Hindu, Kerala.'
    },
    {
      id: 4,
      src: '../assets/images/png 4.jpg',
      name: 'Banumathi',
      details: '26 Yrs, 5 ft 4 in, Lawyer, Hindu, Kerala.'
    },
    {
      id: 5,
      src: '../assets/images/pmg3.jpg',
      name: 'Priyanka',
      details: '26 Yrs, 5 ft 4 in, Lawyer, Hindu, Kerala.'
    },
    {
      id: 6,
      src: '../assets/images/png.jpg',
      name: 'Kavi',
      details: '26 Yrs, 5 ft 4 in, Lawyer, Hindu, Kerala.'
    }
  ];

  dislikedProfiles: any[] = [];
  currentSlideIndex = 0;
  feedback: { [key: number]: string | null } = {};

  constructor(private snackBar: MatSnackBar, public router: Router) {}

  ngOnInit() {
    this.loadDislikedProfiles();
  }

  loadDislikedProfiles() {
    const storedDislikedProfiles = JSON.parse(localStorage.getItem('dislikedProfiles') || '[]');
    this.dislikedProfiles = storedDislikedProfiles;
  }

  get currentProfile() {
    return this.profiles[this.currentSlideIndex];
  }
  
  like(id: number, name: string) {
    const likedProfile = this.profiles.find(profile => profile.id === id);
    if (likedProfile) {
      this.snackBar.open(`You liked ${name}`, 'Close', {
        duration: 2000,
        verticalPosition: 'top',  // Change position to center
        horizontalPosition: 'center' // Position the snackbar in the center
      });
    }
  }
  
  onNoClick(image: any) {
    const confirmation = confirm(`Are you sure you don't like ${image.name}?`);
    if (confirmation) {
      // Remove from profiles
      this.profiles = this.profiles.filter(img => img.id !== image.id);
  
      // Add to local storage
      const dislikedProfiles = JSON.parse(localStorage.getItem('dislikedProfiles') || '[]');
      dislikedProfiles.push(image);
      localStorage.setItem('dislikedProfiles', JSON.stringify(dislikedProfiles));
  
      // Show message
      this.snackBar.open(`You disliked ${image.name}`, 'Close', {
        duration: 2000,
        verticalPosition: 'top',  // Change position to center
        horizontalPosition: 'center' // Position the snackbar in the center
      });
    }
  }
  

  nextSlide() {
    if (this.currentSlideIndex < this.profiles.length - 1) {
      this.currentSlideIndex++;
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  onMenuClick() {
    this.router.navigate(['gesture']);
  }
}
