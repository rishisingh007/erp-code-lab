const [message, setMessage] = useState(null);

const showSuccess = (msg) => {
  setMessage({ type: "success", text: msg });
};

const showError = (msg) => {
  setMessage({ type: "error", text: msg });
};