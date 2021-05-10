import { Container } from "./styles";

const Button = ({ children, whiteSchema, ...rest }) => (
  <Container whiteSchema={whiteSchema} type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
