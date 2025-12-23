import FarmerDashboard from "./FarmerDashboard";
import BuyerDashboard from "./BuyerDashboard";

export default function App() {
  // Hardcoded IDs for MVP
  const farmerId = "694985ec27f9c9b3d97a36ca";
  const buyerId = "694a3a1bb8820bb94462331f";

  return (
    <div>
      <FarmerDashboard farmerId={farmerId} />
      <hr />
      <BuyerDashboard buyerId={buyerId} />
    </div>
  );
}
