export type ProjectCategory = 
  | 'All'
  | 'Robotics & Control'
  | 'Robotics & Automation'
  | 'Embedded & IoT'
  | 'Computer Vision & AI'
  | 'Industrial Automation'
  | 'Engineering Software'
  | 'Software & AI';

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'PROTOTYPE' | 'FIELD TESTED';

export interface ProjectMedia {
  id?: string;
  project_id?: string;
  type: 'image' | 'diagram' | 'schematic' | 'video';
  url: string;
  caption?: string;
  sort_order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  category: ProjectCategory | string;
  status: ProjectStatus;
  technologies: string[];
  thumbnail_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  problem: string;
  engineering_approach: string;
  what_i_built: string;
  system_architecture: string;
  workflow: string;
  results_outcome: string;
  featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  media?: ProjectMedia[];
}

export type ProjectFormData = Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
};
