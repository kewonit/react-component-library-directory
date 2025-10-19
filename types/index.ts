export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  website: string;
  image: string;
  featured?: boolean;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}
