import { LearningStatus } from '../enums/learning-status.enum';

export interface Word {
  id: number;
  originalWord: string;
  translation: string;
  isLearned?: LearningStatus;
}
