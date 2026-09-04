export interface SkillItem {
  name: string;
  telemetryCode: string;
  description?: string;
  proficiency?: number;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  systemCode: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  dateText: string;
  description: string;
  whatItDemonstrates?: string;
  metrics?: string;
  badge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer?: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  whatILearned?: string[];
  engineeringRelevance?: string;
  skillsCovered: string[];
}

export interface SystemStatus {
  coreStatus: 'ONLINE' | 'STANDBY' | 'DEGRADED';
  telemetryFPS: number;
  uptimeSeconds: number;
  activeModules: number;
  currentCoordinates: string;
}
