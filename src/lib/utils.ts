import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateCustomId = (role: 'user' | 'agent' | 'promoter') => {
  const prefix = { user: 'GGEX', agent: 'GGEXA', promoter: 'GGEXP' }[role];
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomDigits}`;
};
