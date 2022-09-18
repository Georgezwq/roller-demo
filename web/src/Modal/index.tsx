import { useState } from "react";
import { useTimeout } from "./helper";
import Switch from "./Switch";
import "./index.css";

interface FormValues {
  message?: string;
  type?: string;
}

const Modal = () => {
  const [values, setValues] = useState<FormValues>({});
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);

  const onChange = (key: string, newValue?: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const onSubmit = () => {
    console.log("Submit form...");
    console.log("Values send to the server:", values);
    setPlaying(false);
    // 通过父页面，给 service_worker 发送提交的消息
    window.parent.postMessage({ type: "submit" }, "*");
  };

  const onCancel = () => {
    // 通过父页面，给 service_worker 发送取消的消息
    window.parent.postMessage({ type: "cancel" }, "*");
  };

  useTimeout(
    () => {
      onSubmit();
    },
    !focused && playing ? 4500 : null
  );

  return (
    <div
      className="flex flex-col gap-4 p-3 bg-white text-xs text-paper-1000"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      <div className="grid grid-cols-3">
        <div
          className="w-min px-2 py-1 text-paper-500 rounded-md hover:bg-paper-50 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </div>
        <h1 className="font-semibold text-[13px] text-center self-center">
          Roll up
        </h1>
      </div>

      <textarea
        className="w-full h-full bg-paper-50 px-2 py-3 rounded-lg resize-none border-[1px] border-transparent focus:border-paper-1000 focus:outline-none placeholder:text-paper-500"
        name="message"
        placeholder="Add a note..."
        rows={2}
        value={values.message}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange("message", e.target.value)}
      />

      <div className="flex justify-between">
        <Switch
          value={values.type}
          onChange={(newValue: string) => onChange("type", newValue)}
        />

        <div
          className={`btn flex justify-center items-center w-[72px] h-[32px] p-1 rounded-lg cursor-pointer text-[13px] done ${
            !focused && playing ? "playing" : ""
          }`}
          onClick={onSubmit}
        >
          Done
        </div>
      </div>
    </div>
  );
};

export default Modal;
