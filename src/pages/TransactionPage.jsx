import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchTransactions } from "../services/PaymentService";
import { useAuth } from "../contexts/AuthContext";
import { AlertCircle, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // function to get all successful transaction
  const loadTransaction = async () => {
    setLoading(true);
    try {
      const transactions = await fetchTransactions();
      setTransactions(transactions);
      setError(null);
    } catch (error) {
      console.log("Failed to fetch transactions");
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransaction();
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // format currency
  const formatAmount = (amount) => {
    return `₹ ${(amount / 100).toFixed(2)}`;
  };

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="text-blue-600" />
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-white min-h-lg rounded-lg">
            <HashLoader size={30} color="#a755f7" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow flex flex-col p-12 items-center justify-center">
            <Receipt size={60} className="text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Transaction yet
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              You haven't made any credits transaction yet. Visit the
              Subscription page to buy credits.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-50 border-b border-t border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Credits Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment Mode
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.transactionDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.planId === "premium"
                        ? "Premium Plan"
                        : transaction.planId === "ultimate"
                        ? "Ultimate Plan"
                        : "Basic Plan"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.creditsAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.paymentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.paymentMode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;
