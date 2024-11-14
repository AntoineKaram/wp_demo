import React from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.title}>Streamline Your Workflow</h1>
          <p className={classes.subtitle}>
            Empower your projects with efficient resource management, supplier
            collaboration, and seamless task tracking.
          </p>
          <Button
            className={classes.getStartedButton}
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
        </div>
      </section>

      <section className={classes.features}>
        <h2 className={classes.sectionTitle}>Why Choose Us?</h2>
        <div className={classes.featuresGrid}>
          <div className={classes.feature}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Efficiency"
              className={classes.featureIcon}
            />
            <h3>Efficiency</h3>
            <p>Save time and effort with our streamlined workflow tools.</p>
          </div>
          <div className={classes.feature}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/252/252030.png"
              alt="Collaboration"
              className={classes.featureIcon}
            />
            <h3>Collaboration</h3>
            <p>Connect and collaborate with suppliers seamlessly.</p>
          </div>
          <div className={classes.feature}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png"
              alt="Insight"
              className={classes.featureIcon}
            />
            <h3>Insight</h3>
            <p>Track progress and stay updated with real-time analytics.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
