import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to menu page as the main entry point
  redirect('/menu');
}