import { useState } from "react";

export default function useInput() {
  const [vaule, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.vaule);
  };

  return {
    vaule,
    setValue,
    handleChange,
  };
}
