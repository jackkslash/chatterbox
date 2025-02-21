import { Chat } from '@/components/Chat';
import { NavigationBar } from '@/components/NavigationBar';

export default function page() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavigationBar />
      <Chat />
    </div>

  );
}