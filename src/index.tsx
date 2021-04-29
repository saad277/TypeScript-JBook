import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState("");
  const serviceRef = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!serviceRef.current) {
      return;
    }

    const result = await serviceRef.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(result.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
      >
        {" "}
      </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
