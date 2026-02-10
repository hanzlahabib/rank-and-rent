export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  author: string;
  authorBio: string;
  publishDate: string;
  category: string;
  readTime: string;
  heroImage: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
}
