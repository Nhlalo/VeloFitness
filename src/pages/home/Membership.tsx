import { useNavigate } from "react-router";
import Container from "../../components/shared/Container";

export default function Membership() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/membership");
  }
  return (
    <Container>
      <div>
        <h2>
          One Membership. <br /> Limitless Potential.
        </h2>
        <p>
          Expert-led training sessions, personalized nutrition guidance, and
          relaxing spa facilities.
        </p>
        <button type="button" onClick={handleClick}>
          Explore Member Benefits
        </button>
      </div>
    </Container>
  );
}
