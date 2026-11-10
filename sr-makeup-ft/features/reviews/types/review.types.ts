export interface Review {
  id: string;
  clientName: string;
  rating: number; // 1 to 5
  comment: string;
  serviceTitle?: string;
  clientPhotoUrl?: string;
  date: string;
}

export interface CreateReviewDto {
  clientName: string;
  rating: number;
  comment: string;
  serviceId?: string;
}

