import { Container } from "./styles";
import Button from "../Button";
import { FiClipboard, FiCalendar } from "react-icons/fi";

function Card({ title, date, onClick }) {
  return (
    <Container>
      <span>
        <FiClipboard /> {title}
      </span>
      <hr />
      <time>
        <FiCalendar /> {date}
      </time>
      <Button onClick={onClick}> Concluir </Button>
    </Container>
  );
}

export default Card;
