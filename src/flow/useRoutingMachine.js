import { Machine } from "xstate";

/**
 * Page routes and routing logic
 */
const routes = {
  "/": {
    on: {
      NEXT: "/employment-type",
    },
  },
  "/employment-type": {
    on: {
      NEXT: [
        {
          target: "/employed",
          cond: "isEmployed",
        },
        {
          target: "/unemployed",
        },
      ],
    },
  },
  "/employed": {},
  "/unemployed": {},
};

/**
 * Conditions available to our routing logic, used as the `cond` value
 * in a State node
 */
const conditions = {
  isEmployed: (context) => context["employment-type"] === "employed",
};

/**
 * Initialize a routing state machine and access methods
 * for navigating through the flow
 */
function useRoutingMachine() {
  const routingMachine = Machine(
    {
      context: {},
      id: "routing",
      initial: "/",
      states: routes,
    },
    { guards: conditions }
  );

  /**
   * Get the next route in the flow after the current route
   * @param {string} currentRoute - active route
   * @param {object} [formState]
   */
  function getNextRoute(currentRoute, formState = {}) {
    const nextRoutingMachine = routingMachine.withContext(formState);
    const nextState = nextRoutingMachine.transition(currentRoute, "NEXT");

    if (nextState) return nextState.value;
  }

  return {
    getNextRoute,
    routingMachine,
  };
}

export default useRoutingMachine;
