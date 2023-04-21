import styles from './app.module.scss';
import { ChallengeEntry } from './challengeEntry';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to challenge-app!</h1>
      </header>
      <main>
        <h2>Resources &amp; Tools</h2>
        <p>Thank you for using and showing some ♥ for Nx.</p>
        <p>Here are some links to help you get started.</p>
        <ul className="resources">
          <li className="col-span-2">
            <a
              className="resource flex"
              href="https://egghead.io/playlists/scale-react-development-with-nx-4038"
            >
              Scale React Development with Nx (Course)
            </a>
          </li>
          <li className="col-span-2">
            <a
              className="resource flex"
              href="https://nx.dev/latest/react/tutorial/01-create-application"
            >
              Interactive tutorial
            </a>
          </li>
          <li className="col-span-2">
            <a className="resource flex" href="https://nx.app/">
              <svg
                width="36"
                height="36"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M120 15V30C103.44 30 90 43.44 90 60C90 76.56 76.56 90 60 90C43.44 90 30 103.44 30 120H15C6.72 120 0 113.28 0 105V15C0 6.72 6.72 0 15 0H105C113.28 0 120 6.72 120 15Z"
                  fill="#0E2039"
                />
                <path
                  d="M120 30V105C120 113.28 113.28 120 105 120H30C30 103.44 43.44 90 60 90C76.56 90 90 76.56 90 60C90 43.44 103.44 30 120 30Z"
                  fill="white"
                />
              </svg>
              <span className="gutter-left">Nx Cloud</span>
            </a>
          </li>
        </ul>
        <h2>Challenge Container:</h2>
        <ChallengeEntry />
      </main>
    </div>
  );
}

export default App;
