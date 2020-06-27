import { MachineViz } from "@xstate/viz";
import useRoutingMachine from "../flow/useRoutingMachine";
import { useEffect, useState } from "react";

/**
 * Not a super relevant component to grasp the proof of concept. You
 * can mostly ignore this component tbh.
 */
export default function FormStateEditor(props) {
  const [formStateDraft, setFormStateDraft] = useState(
    JSON.stringify(props.initialFormState)
  );
  const [machineReady, setMachineReady] = useState(false);
  const { routingMachine } = useRoutingMachine();

  useEffect(() => {
    if (typeof window !== "undefined") setMachineReady(true);
  }, [routingMachine]);

  return (
    <div style={{ background: "#eee", marginTop: 40, padding: 20 }}>
      <p>
        <label htmlFor="formState">Form State</label>
      </p>
      <textarea
        id="formState"
        onChange={(event) => setFormStateDraft(event.target.value)}
        style={{
          fontFamily: "monospace",
          padding: 10,
          width: "60ch",
        }}
        value={formStateDraft}
      />

      <p>
        <button
          type="button"
          onClick={() => props.setFormState(JSON.parse(formStateDraft))}
        >
          Update form state
        </button>
      </p>

      <pre style={{ backgroundColor: "#ddd", padding: 10 }}>
        <code>formState = {JSON.stringify(props.formState)}</code>
      </pre>

      {machineReady && <MachineViz machine={routingMachine} />}
    </div>
  );
}
