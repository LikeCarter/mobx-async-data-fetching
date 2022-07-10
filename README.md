# Dealing with async data fetching and MobX

This repository includes an example for my preferred way of data-fetching in MobX.

# Hooks and managing global state

This uses [react-promise-suspense](https://github.com/vigzmv/react-promise-suspense) with inspiration from [use-asset](https://github.com/pmndrs/use-asset).

Benefits of this approach:

* Much less boilerplate
* Suspense to handle loading states
* MobX as a first class-citizen
  * Data centralized in one place
  * Easily cache results
  * Easily perform optimistic updates

Other common approaches include:
* Performing data-fetching within a `useEffect`, drawbacks:
  * Lots of boilerplate.
* Using a `useFetch` hook, drawbacks:
  * Will not respond to updates to the MobX store from other components.
  * Multiple places where data is stored.

# Example

```jsx
import usePromise from "react-promise-suspense";

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

function App() {
  <Suspense fallback={<div>loading...</div>}>
    <PostTitle id={1000} />
```

# Codesandbox

<!-- [codesandbox](https://codesandbox.io/s/use-asset-demo-forked-ji8ky) -->