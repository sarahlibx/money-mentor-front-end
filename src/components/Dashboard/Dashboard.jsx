import './Dashboard.css';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
// import getRecent for quick summary view of last 5 transactions/current balance
import * as transactionService from "../../services/transactionService";
import * as userService from "../../services/userService";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  // state
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?._id) {
      setLoading(false);
      return;
    }

      try {
        setLoading(true);
        
        const [transData, updatedUser] = await Promise.all([
            transactionService.index(),
            userService.index(user._id)
        ]);

        setAllTransactions(transData || []);
        if (updatedUser) setUser(updatedUser);
        
        // debugging () in each transaction
        console.log("RECENT DATA ARRIVED:", transData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }};

        fetchDashboardData();
  }, [user?._id]);

const generateMonthOptions = () => {
    const options = [];
    const date = new Date();

    // always calculates next 12 months
    for(let i = 0; i < 12; i++) {
        const monthValue = date.toISOString().slice(0, 7);
        const monthLabel = date.toLocaleString('default', { month: 'long', year: 'numeric'});

        options.push({ value: monthValue, label: monthLabel });

        date.setMonth(date.getMonth() - 1);
    }
    return options;
};

const monthlyData = allTransactions.filter((transactions) =>
    transactions.date.startsWith(selectedMonth),
  );
  console.log(monthlyData)
  const income = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Income")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  const expenses = monthlyData
    .filter((transactions) => transactions.categoryId?.type === "Expense")
    .reduce((acc, transactions) => acc + Number(transactions.amount), 0);
  const net = income - expenses;

  console.log(allTransactions[0]?.categoryId);

  const recentMoves = [...allTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    if (loading) {
  return (
    <main className='dash-content-container'>
      <p>Loading your dashboard...</p>
    </main>
  );
}
     return (
        <main className='dash-content-container'>
            <>
            <h1>Welcome to your dashboard, {user.username}!</h1>
            {/* monthly stats at a glance */}
            <section className='monthly-stats-section'>
                <div className='stats-header'>
                    <select id='month-dropdown' className='month-dropdown' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {generateMonthOptions().map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='stats-grid'>
                    <div className="stat-item">
                        <span className="label">Points</span>
                        <span className="value points">{user.points}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='label'>Income</span>
                        <span className='value income'>${income.toFixed(2)}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='label'>Expenses</span>
                        <span className='value expense'>${expenses.toFixed(2)}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='label'>Net Savings</span>
                        <span className={`value ${net >= 0 ? 'net-positive' : 'net-negative'}`}>${net.toFixed(2)}</span>
                    </div>
                </div>
            </section>
            {/* recent activity */}
            <section className='recent-activity-section'>
                <h2>Here are your recent money moves.</h2>
                <ul className='dashboard-transactions-list'>
                    {recentMoves.map((transaction) => {
                        const isIncomeItem = transaction.categoryId?.type === 'Income';
                        const symbol = isIncomeItem ? '+' : '-';

                        return (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id} className="transaction-link">
                        <li className='transaction-line'key={transaction._id}>
                            {transaction.description}: {' '}
                            <div className={`transaction-amount ${isIncomeItem ? 'amount-income' : 'amount-expense'}`}>
                                {symbol}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                            </div>
                        </li>
                        </Link>
                    );
                    
                })}
                </ul>
                <div className="dash-transactions-actions">
                    <Link to ='/transactions'>
                        <button type='button'>All Transactions</button>
                    </Link>
                    <Link to="/transactions/new">
                        <button type="button">+ Add Transaction</button>
                    </Link>
                </div>
            </section>
            </>
        </main>
    );
};

export default Dashboard;
