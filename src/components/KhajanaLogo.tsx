
import { Coins, TrendingUp } from 'lucide-react';

const KhajanaLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
          <Coins className="h-7 w-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <TrendingUp className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Khajana Fund</h1>
        <p className="text-sm text-gray-600">Collective Investment</p>
      </div>
    </div>
  );
};

export default KhajanaLogo;
