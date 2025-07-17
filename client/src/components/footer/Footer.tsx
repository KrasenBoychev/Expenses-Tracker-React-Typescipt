import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <footer
      className={`mt-auto ${
        isAuthenticated && path !== "" && "ml-[300px]"
      } text-center py-5`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white/70">
          &copy; Expenses Tracker created by Krasen Boychev 2025
        </p>
      </div>
    </footer>
  );
}
