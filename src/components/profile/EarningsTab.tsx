
import { DollarSign, BarChart3, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EarningsData {
  totalEarnings: number;
  thisMonth: number;
  pendingPayout: number;
  projects: { name: string; amount: number }[];
  recentTransactions: {
    id: number;
    type: string;
    amount: number;
    date: string;
    project?: string;
    status: string;
  }[];
}

interface EarningsTabProps {
  earningsData: EarningsData;
}

const EarningsTab = ({ earningsData }: EarningsTabProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Earnings Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <h3 className="text-3xl font-bold">${earningsData.totalEarnings.toFixed(2)}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <DollarSign size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <h3 className="text-3xl font-bold">${earningsData.thisMonth.toFixed(2)}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <BarChart3 size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Pending Payout</p>
                <h3 className="text-3xl font-bold">${earningsData.pendingPayout.toFixed(2)}</h3>
              </div>
              <Button variant="outline" size="sm" className="border-[#A26769] hover:bg-[#BFB5AF]">Withdraw</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Earnings by Project</h3>
            <div className="space-y-4">
              {earningsData.projects.map((project, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center gap-3">
                    <LinkIcon size={16} className="text-gray-400" />
                    <span className="font-medium">{project.name}</span>
                  </div>
                  <span className="font-bold">${project.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {earningsData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <div className="font-medium">
                      {transaction.type === 'payout' ? 'Payout to bank account' : 
                       `Earning from ${transaction.project}`}
                    </div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${transaction.type === 'payout' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.type === 'payout' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsTab;
