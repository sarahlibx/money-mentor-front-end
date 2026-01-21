import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
// import getRecent for quick summary view of last 5 transactions/current balance
import { getRecent } from '../../services/transactionService';

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const transData = await getRecent();
                setRecentTransactions(transData || []);
                // debugging () in each transaction
                console.log("RECENT DATA ARRIVED:", transData);
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchDashboardData()
    }, [user])

    return (
        <main>
            <>
            <h1>Welcome, {user.username}!</h1>
            <section>
            <h2>Here are your recent money moves.</h2>
                <ul>
                    {recentTransactions.map((transaction) => (
                        <li key={transaction._id}>
                            {transaction.description}: {' '}
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)} 
                        </li>
                    ))}
                </ul>
                <Link to ='/transactions'>View All Transactions</Link>
            </section>
            </>
        </main>
    );
};

export default Dashboard;
