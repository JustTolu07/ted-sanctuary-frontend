/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: 'adventure' | 'cozy' | 'milestone' | 'romantic';
  detailedStory: string;
  heartColor: string;
}

export interface InteractiveLetter {
  id: string;
  title: string;
  preview: string;
  content: string;
  signature: string;
  date: string;
  color: string;
}

export interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}
