export type ArticleType = {
  id: number;
  title: string;
  link: string | null;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  file: any;
};

export type CategoryType = {
  id: number;
  title: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  resources: ArticleType[] | [];
};

export type ServiceType = {
  animation: string;
  blurb: string;
  created_at: Date;
  description: string;
  id: number;
  image: any;
  level: string;
  price: number;
  published_at: Date;
  slug: string;
  title: string;
  updated_at: Date;
};

export type TestimonialType = {
  id: number;
  title: string;
  comment: string;
  name: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  photo: any;
};
