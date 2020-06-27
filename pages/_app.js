import "@xstate/viz/themes/dark.css";
import Link from "next/link";
import FormStateEditor from "../components/FormStateEditor";
import router from "next/router";
import useRoutingMachine from "../flow/useRoutingMachine";
import { useState } from "react";

function App({ Component, pageProps }) {
  const initialFormState = { "employment-type": "" };
  const [formState, setFormState] = useState(initialFormState);
  const { getNextRoute } = useRoutingMachine();

  /**
   * Navigate to the next page in the flow
   */
  function handleNextPageClick() {
    const nextRoute = getNextRoute(router.pathname, formState);
    return router.push(nextRoute);
  }

  return (
    <div>
      <Component {...pageProps} />

      <button
        onClick={handleNextPageClick}
        style={{ fontSize: 18, padding: 10 }}
        type="button"
      >
        Next
      </button>

      <p>
        <Link href="/">
          <a>Back home</a>
        </Link>
      </p>

      <FormStateEditor
        formState={formState}
        initialFormState={initialFormState}
        setFormState={setFormState}
      />
    </div>
  );
}

export default App;
