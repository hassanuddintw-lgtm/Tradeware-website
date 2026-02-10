import { Metadata } from "next";
import { DollarSign, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing Management | Tradeware Admin",
};

export default function PricingPage() {
  const pricingRules = [
    { id: "1", name: "Base Shipping Cost - Africa", amount: "$2,700", type: "Shipping" },
    { id: "2", name: "Base Shipping Cost - Middle East", amount: "$2,200", type: "Shipping" },
    { id: "3", name: "Insurance Rate", amount: "2%", type: "Insurance" },
    { id: "4", name: "Documentation Fee", amount: "$300", type: "Service" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Pricing Management</h1>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping & Service Fees</h2>
        <div className="space-y-4">
          {pricingRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">{rule.name}</div>
                <div className="text-sm text-gray-600">{rule.type}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-900">{rule.amount}</span>
                <button className="p-2 text-gray-600 hover:text-primary-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing Notes</h2>
        <p className="text-gray-700">
          Vehicle prices are set individually based on auction purchase price, market value, and condition. 
          Shipping costs vary by destination and vehicle size. Contact the team for custom pricing requests.
        </p>
      </div>
    </div>
  );
}
