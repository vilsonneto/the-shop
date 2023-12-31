import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";

import { Container } from "./styles";
import { Link } from "react-router-dom";

interface IDataSubmit {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuth();

  const [error, setError] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Campo obrigatório")
      .email("Email invalido")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email invalido."
      ),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IDataSubmit) => {
    signIn(data, setError);
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Email"
            size="small"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            size="small"
            color="primary"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
        </div>

        <p className="redirect">
          Não possui uma conta?{" "}
          <span>
            <Link to="/register">Se cadastre!</Link>
          </span>
        </p>

        {error && <p className="error"> Usuário ou senha incorretas! </p>}

        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Enviar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
