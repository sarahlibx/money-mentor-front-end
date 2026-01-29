import "./Mentor.css";
import { Container, Row, Col, Stack, Form, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

import BeginnerBadge from "../../assets/Beginner.png";
import SaverBadge from "../../assets/Saver.png";
import BuilderBadge from "../../assets/Builder.png";
import StrategistBadge from "../../assets/Strategist.png";
import MoneyMentorBadge from "../../assets/MoneyMentor.png";


const BADGES = [
  { min: 0, level: 1, name: "Beginner", img: BeginnerBadge },
  { min: 400, level: 2, name: "Saver", img: SaverBadge },
  { min: 1500, level: 3, name: "Builder", img: BuilderBadge },
  { min: 3000, level: 4, name: "Strategist", img: StrategistBadge },
  { min: 5000, level: 5, name: "Money Mentor", img: MoneyMentorBadge },
];

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

  const pointsToNextLevel = () => {
    const currentPoints = Math.max(Number(user?.points) || 0, 0);

    if (currentPoints < 400) return 400 - currentPoints;
    if (currentPoints < 1500) return 1500 - currentPoints;
    if (currentPoints < 3000) return 3000 - currentPoints;
    if (currentPoints < 5000) return 5000 - currentPoints;

    return 0;
  };

  const currentBadge = ()=>{
    if(user.points <400) return BADGES[0]
    else if(user.points>399 && user.points<1500)return BADGES[1]
    else if(user.points>1499 && user.points<3000)return BADGES[2]
    else if(user.points>2999 && user.points<5000)return BADGES[3]
    else if(user.points>4999)return BADGES[4]
    }
  
//   BADGES.slice()
//     .reverse()
//     .find((badge) => user.points <= badge.min);

  return (
    <Container className= "py-5">
    <main className="mentor-container">
      {/* Header */}
      <Row className='mb-4'>
                    <Col>
                        <h1 className="display-5 fw-bold text-center">Hello, {user.username}. Here's your profile overview. </h1>
                    </Col>
                </Row>
       <Card className="shadow-sm border-0 mb-5">
                      <Card.Body className="p-4">
                      <Row className='stats-grid text-center g-4'>
                        <Col xs={6} md = {6} className="stat-item">
                              <div className="label">Mentor level</div>
                              <div className="value points">{mentors.level}</div>
                          </Col>
                          <Col xs={6} md = {6} className="stat-item">
                             <div className="label">Points earned:</div>
                              <div className="value points">{user.points}</div>
                          </Col>
            
                      </Row>
                         
                  </Card.Body>
              </Card>
      <div className="mentor-header">

        <h2 className="mentor-level">
          Way to save! You've made it to level {mentors.level}!
        </h2>

        <h3 className="mentor-level-name">
          You are now a {mentors.levelName}
          <p>
            <img
              src={currentBadge().img}
              alt={currentBadge().name}
              className="mentor-badge-inline"
            />
          </p>
        </h3>

        {/* <p className="mentor-points">Points earned: {user.points}</p> */}

        <p className="mentor-next-level">
          {pointsToNextLevel() > 0
            ? `${pointsToNextLevel()} points left to next level`
            : "You've reached the highest level!"}
        </p>

        <div className="progress-bar-container">
          <div
            className="progress-fill"
            style={{
              width:
                pointsToNextLevel() > 0
                  ? `${(user.points / (user.points + pointsToNextLevel())) * 100}%`
                  : "100%",
            }}
          ></div>
        </div>
      </div>

      {/* Mentor message */}
      <div className="mentor-message">
        <p>{mentors.mentorMessage}</p>
      </div>

      {/* Transactions */}
      <section className="mentor-transactions-container">
        <h2 className="mentor-transactions-title">Recent Transactions</h2>

        <div className="mentor-transactions-list">
          {mentors.recentTransactions?.length > 0 ? (
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
    </Container>
//     <Container className="py-5">
//   <main className="mentor-container">

//     {/* Header */}
//     <Row className="mb-4">
//       <Col>
//         <h1 className="display-5 fw-bold text-center">
//           Hello, {user.username}!
//         </h1>
//         <h2>Here's your profile overview: </h2>
//       </Col>
//     </Row>

//     {/* Stats */}
//     <Card className="shadow-sm border-0 mb-5">
//       <Card.Body className="p-4">
//         <Row className="text-center g-4">
//           <Col xs={6}>
//             <div className="text-muted small">Mentor level</div>
//             <div className="fs-3 fw-bold">{mentors.level}</div>
//           </Col>

//           <Col xs={6}>
//             <div className="text-muted small">Points earned</div>
//             <div className="fs-3 fw-bold">{user.points}</div>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>

//     {/* Mentor Level */}
//     <Card className="shadow-sm border-0 mb-4">
//       <Card.Body className="text-center p-4">

//         <h2 className="fw-semibold mb-2">
//           Way to save! You've made it to level {mentors.level}!
//         </h2>

//         <h4 className="mb-0">
//           You are now a {mentors.levelName}
//         </h4>

//         <img
//           src={currentBadge().img}
//           alt={currentBadge().name}
//           className="mb-3"
//           style={{ maxWidth: "380px" }}
//         />

//         <p className="mb-2">
//           {pointsToNextLevel() > 0
//             ? `${pointsToNextLevel()} points left to next level`
//             : "You've reached the highest level!"}
//         </p>

//         {/* Progress bar — SAME logic */}
//         <div className="progress" style={{ height: "10px" }}>
//           <div
//             className="progress-bar"
//             role="progressbar"
//             style={{
//               width:
//                 pointsToNextLevel() > 0
//                   ? `${(user.points / (user.points + pointsToNextLevel())) * 100}%`
//                   : "100%",
//             }}
//           />
//         </div>

//       </Card.Body>
//     </Card>

//     {/* Mentor Message */}
//     <Card className="shadow-sm border-0 mb-5">
//       <Card.Body className="p-4">
//         <h5 className="fw-semibold mb-2">Mentor Message</h5>
//         <p className="mb-0">{mentors.mentorMessage}</p>
//       </Card.Body>
//     </Card>

//     {/* Transactions */}
//     <Card className="shadow-sm border-0 mb-5">
//       <Card.Body className="p-4">

//         <h5 className="fw-semibold mb-4">Recent Transactions</h5>

//         {mentors.recentTransactions?.length > 0 ? (
//           mentors.recentTransactions.map((t) => (
//             <div
//               key={t._id}
//               className="border rounded p-3 mb-3 bg-light"
//             >
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <span
//                   className="fw-bold"
//                   style={{
//                     color: t.type === "Expense" ? "#CB4F4C" : "#33AA5E",
//                   }}
//                 >
//                   ${t.amount}
//                 </span>
//                 <span className="badge bg-secondary">{t.type}</span>
//               </div>

//               <div className="small text-muted">
//                 <div>Category: {t.description}</div>
//                 <div>Created: {t.date.slice(0, 10)}</div>
//                 <div>Updated: {t.updatedAt.slice(0, 10)}</div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-muted">No Transactions</p>
//         )}

//       </Card.Body>
//     </Card>

//     {/* Back */}
//     <div className="text-center">
//       <Link to="/">
//         <button className="btn btn-outline-primary">
//           Return to Dashboard
//         </button>
//       </Link>
//     </div>

//   </main>
// </Container>

  );
};

export default Mentor;
