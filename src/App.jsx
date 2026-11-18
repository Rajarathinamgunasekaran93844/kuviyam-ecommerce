import { motion } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen overflow-x-hidden bg-[#f8f6f0]"
    >
      <AppRoutes />
    </motion.div>
  );
}

export default App;
