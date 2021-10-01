import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!"
      )
      .required("Campo obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório"),
  });

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = (data) => {
    api
      .post("/register", data)
      .then((response) => {
        toast.success("Sucesso ao criar usuário");
        history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar usuário, email duplicado"));
  };

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastro</h1>
            <Input
              label="Nome"
              icon={FiUser}
              placeholder="Seu nome"
              register={register}
              name="name"
              error={errors.name?.message}
            />
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
            <Input
              label="Confirmação de senha"
              icon={FiLock}
              placeholder="Confirmação de senha"
              register={register}
              name="passwordConfirm"
              error={errors.passwordConfirm?.message}
              type="password"
            />
            <Button type="submit"> Enviar </Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
