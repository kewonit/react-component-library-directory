import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getCompanyInitial(company: { name: string } | null | undefined): string {
  return company?.name?.charAt(0).toUpperCase() || '?';
}

export function generateJobUrl(companyName: string, title: string, id: string): string {
  const slug = `${slugify(companyName)}-${slugify(title)}-${id}`;
  return `/jobs/${slug}`;
}
