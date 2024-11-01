export interface ProjectCardProps {
  data: {
    id: number;
    name: string;
    description: string;
    icon: string;
    website: string;
    githubRepo: string;
    level: 'low' | 'medium' | 'high' | string;
    featured?: boolean;
  };
}
