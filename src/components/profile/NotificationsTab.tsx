
import { ThumbsUp, MessageSquare, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: number;
  type: string;
  content: string;
  time: string;
  read: boolean;
}

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="outline" size="sm" className="border-[#A26769] hover:bg-[#BFB5AF]">Mark all as read</Button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`${!notification.read ? 'border-l-4 border-l-[#582C4D]' : ''}`}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`rounded-full p-2 ${
                notification.type === 'like' ? 'bg-red-100 text-red-500' :
                notification.type === 'comment' ? 'bg-blue-100 text-blue-500' :
                notification.type === 'payment' ? 'bg-green-100 text-green-500' :
                'bg-amber-100 text-amber-500'
              }`}>
                {notification.type === 'like' && <ThumbsUp size={18} />}
                {notification.type === 'comment' && <MessageSquare size={18} />}
                {notification.type === 'payment' && <DollarSign size={18} />}
                {notification.type === 'milestone' && <BarChart3 size={18} />}
              </div>
              <div className="flex-1">
                <p className={`${!notification.read ? 'font-medium' : ''}`}>
                  {notification.content}
                </p>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <Badge variant="outline" className="h-2 w-2 rounded-full bg-[#582C4D]"></Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
