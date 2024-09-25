import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
// import { Profile } from '../profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Profile[] = [];

  setProfiles(profiles: Profile[]) {
    this.profiles = profiles;
  }

  getProfiles() {
    return this.profiles;
  }

  getProfileByIndex(index: number): Profile | undefined {
    return this.profiles[index];
  }
}
