// src/app/models/profile.model.ts

export interface Profile {
    id: number;      // Unique identifier for the profile
    src: string;     // URL of the profile image
    name: string;    // Name of the profile
    details: string; // Additional details about the profile (e.g., age, profession)
    isFavorite: boolean; // Indicates if the profile is marked as a favorite
  }
  