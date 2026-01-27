import './Mentor.css';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

const Mentor = ({ mentors }) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      const updatedUser = await userService.index(user._id);
      setUser(updatedUser);
    };
    fetchUserData();
  }, []);

  if (!mentors || !user) return <h1>Loading</h1>;

  
  const pointsToNextLevel = () =>{
      const currentPoints = user?.points || 0;
      let nextLevelAt = null;
    
      if (currentPoints.points  < 400) nextLevelAt = 400;
      else if (currentPoints.points < 1500) nextLevelAt = 1500;
      else if (currentPoints.points < 3000) nextLevelAt = 3000;
      else if (currentPoints.points < 5000) nextLevelAt = 5000;
      else return 0;

      return nextLevelAt - currentPoints;
  }

  return (
    <main className="mentor-container">
      {/* Header */}
      <div className="mentor-header">
        <h1>Hello, {user.username}</h1>
        <h2 className="mentor-level">Way to save! You've made it to level {mentors.level}!</h2>
        <h3 className='mentor-level-name'>You are now a {mentors.levelName}  
          {''}<i className="bi bi-trophy-fill" style={{ fontSize: '1.5rem', color: 
            user.points < 0 ? '#50C878' :
            user.points < 400 ? '#B76E79' :
            user.points < 1500 ? '#CD7F32' :
            user.points < 3000 ? '#C0C0C0' :
            '#FFD700' }}>
          </i>
        </h3>
        {/* TODO: conditionally render badges based on level stauts */} 
          <p className="mentor-points">Points earned: {user.points}</p>
          <p className="mentor-next-level">
            {pointsToNextLevel() !== null 
            ? `${pointsToNextLevel()} points left to next level` 
            : "You've reached the highest level!"}
          </p>
            <div className="progress-bar-container">
            {/* Calculate percentage: (Current / Goal) * 100 */}
            <div className="progress-fill" style={{ width: `${(user.points / (user.points + pointsToNextLevel())) * 100}%` }}>
          </div>
        </div>
      </div>

      {/* Mentor message */}
      <div className="mentor-message">
        <p>{mentors.mentorMessage}</p>
      </div>

      {/* Transactions */}
      <section className="mentor-transactions-container">
        <h2 className="mentor-transactions-title">Recent Transactions</h2>
          <div className='mentor-transactions-list'>
            {mentors.recentTransactions && mentors.recentTransactions.length > 0 ? (
              mentors.recentTransactions.map((t) => (
            <div key={t._id} className="mentor-transaction-card">
              <div className="mentor-transaction-main">
                <span
                  className="mentor-amount"
                  style={{
                    color: t.type === "Expense" ? "#CB4F4C" : "#33AA5E",
                  }}
                >
                  ${t.amount}
                </span>
                <span className="mentor-type">{t.type}</span>
              </div>

              <div className="mentor-transaction-meta">
                <span className="mentor-desc">Category: {t.description}</span>
                <span>Created at: {t.date.slice(0, 10)}</span>
                <span>Updated at: {t.updatedAt.slice(0, 10)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="mentor-no-transactions">No Transactions</p>
        )}
        </div>
      </section>

      <Link to="/">
        <button type="button">Return to Dashboard</button>
      </Link>
    </main>
  );
};

export default Mentor;
