import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Profile } from '../model/profile.model';
// import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileDetails!: Profile | undefined;

  constructor(private profileService: ProfileService, private route: ActivatedRoute,public router:Router) {}

  ngOnInit() {
    const index = Number(this.route.snapshot.params['id']); // Retrieve the index from the route parameters
    this.profileDetails = this.profileService.getProfileByIndex(index); // Get profile details from the service
  }
  prevProfile(){
    this.router.navigate(['gesture'])
  }
}
