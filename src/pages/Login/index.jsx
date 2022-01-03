import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiLock, FiMail } from "react-icons/fi";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/login", data)
      .then((response) => {
        const { accessToken, user } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(accessToken));
        localStorage.setItem("@Doit:user", JSON.stringify(user));


        setAuthenticated(true);

        
        history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <Input
              label="Email"
              icon={FiMail}
              placeholder="Seu melhor email"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              label="Senha"
              icon={FiLock}
              placeholder="Uma senha bem segura"
              register={register}
              name="password"
              error={errors.password?.message}
              type="password"
            />
            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta? Faça seu <Link to="/signup">cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
