import { a, useSpring } from "@react-spring/web";
import { observer } from "mobx-react-lite";
import { Suspense, useState } from "react";
import usePromise from "react-promise-suspense";
import { newsStore } from "./NewsStore";

const FIRST = 9060;

const Id = ({ id }) => {
  const props = useSpring({ from: { id: 0 }, id, reset: true });
  return <a.h1>{props.id.to(Math.round)}</a.h1>;
};

const PostTitle = observer(({ id }) => {
  // We use this to manage the Suspense, we do not use the data from the promise
  // directly, but we use the promise to trigger the Suspense.
  const _ = usePromise(newsStore.load, [id]);

  // We reference the mobx store directly to get the post data.
  // This lets us observe state changes made outside the component.
  const { by, title, url, text, time } = newsStore.article;

  // By the time we're here the entry is present(!), no checking for loading states,
  // and no error handling at the component level (catch them in ErrorBoundaries).
  return (
    <>
      <h2>{by}</h2>
      <h6>{new Date(time * 1000).toLocaleDateString("en-US")}</h6>
      {title && <h4>{title}</h4>}
      <a href={url}>{url}</a>
      {text}
    </>
  );
});

export default function App() {
  const [id, set] = useState(FIRST);

  return (
    <>
      <Id id={id} />
      <div className="content">
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostTitle id={id} />
        </Suspense>
      </div>
      <div className="nav">
        <button onClick={() => set(id + 1)}>
          <div>→</div>
        </button>
        <button onClick={() => set(id - 1)}>
          <div>←</div>
        </button>
      </div>
    </>
  );
}
