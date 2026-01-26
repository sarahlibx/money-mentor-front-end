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
    //   const currentPoints = user?.points ?? 0;
    
      let nextLevelAt = null;
    
      if (user?.points  < 400) nextLevelAt = 400;
      else if (user?.points < 1500) nextLevelAt = 1500;
      else if (user?.points < 3000) nextLevelAt = 3000;
      else if (user?.points < 5000) nextLevelAt = 5000;

      return nextLevelAt !== null ? nextLevelAt - user?.points : null;
  }

  return (
    <main className="mentor-container">
      {/* Header */}
      <div className="mentor-header">
        <h1>Hello,{user.username}</h1>
        <p className="mentor-level-name">{mentors.levelName}</p>
        <p className="mentor-level">Level {mentors.level}</p>
        <p className="mentor-points">Points: {user.points}</p>
        <p className="mentor-next-level">
        {`${pointsToNextLevel()} points left to next level`}
        </p>
      </div>

      {/* Mentor message */}
      <div className="mentor-message">
        <p>{mentors.mentorMessage}</p>
      </div>

      {/* Transactions */}
      <section className="mentor-transactions">
        <h2 className="mentor-transactions-title">Recent Transactions</h2>

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
      </section>

      <Link to="/">
        <button type="button">Return to Dashboard</button>
      </Link>
    </main>
  );
};

export default Mentor;
