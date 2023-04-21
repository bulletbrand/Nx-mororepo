import styles from './components.module.scss';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export function Components(props: ComponentsProps) {
  return (
    <div className={styles.description}>
      <h1>The Challenge</h1>
      <p>
        First of all branch out from the master to solve this challenge. Task:
        Please extend the components library of this repo with a zoomable pdf
        view. component and use the containers dimensions. Furthermore the only
        attribute of the component should be a url to a pdf
        <ul>
          <li>
            The component should look like:
            <a href="https://www.figma.com/file/yrrCwAmkg1ZftdDZnATk0p/Untitled?node-id=2%3A40">
              Figma-Design
            </a>
          </li>
          <li>
            the component should be a functional react component, you can use
            whatever npm has to offer
          </li>
          <li>
            This component should be able to function within a container
            component and should adapt to the containers dimensions (height can
            be capped if needed, width should be adjusted)
          </li>
          <li>
            the component should zoom/pan the rendered pdf via mouse(wheel) and
            touch gestures
          </li>
          <li>
            the only attribute should be a url to a pdf file (you can use the
            two files that are provided at the root of this repository
            (https://git.atroo.de/onboarding/monorepo/raw/master/lyvyMarketSegment.pdf
            ,
            https://git.atroo.de/onboarding/monorepo/raw/master/StatementOfReturn.pdf)
          </li>
          <li>the component should be showcased in its own storybook story</li>

          <li>
            the component should be integrated in the challenge-app underneath
            this description
          </li>
          <li>
            please try your best to solve this challenge on your own. Whenever
            you feel stuck you are free to ask us of course
          </li>
        </ul>
      </p>
    </div>
  );
}

export default Components;
