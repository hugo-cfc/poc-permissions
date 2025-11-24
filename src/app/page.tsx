import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to dashboard for simplicity; middleware will ensure auth
  redirect('/dashboard');
}
