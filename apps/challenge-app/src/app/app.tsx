import styles from './app.module.scss';
import { ChallengeEntry } from './challengeEntry';

export function App() {
  return (
    <div className={styles.app}>
        <ChallengeEntry />
    </div>
  );
}

export default App;
