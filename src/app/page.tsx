import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/calcom/cal.com');  
  return null;
}
