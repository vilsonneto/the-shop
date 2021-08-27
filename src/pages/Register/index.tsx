import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";

import { Container } from "./styles";
import { Link } from "react-router-dom";

interface IDataSubmit {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { signUp } = useAuth();

  const [error, setError] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .required("Campo obrigatório")
      .email("Email invalido")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email invalido."
      ),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "Email não está igual."),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords não está igual"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IDataSubmit) => {
    const { username, email, password } = data;

    const newData = { username, password, email };

    signUp(newData, setError);
  };

  return (
    <Container>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            size="small"
            color="primary"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Seu melhor email"
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
            label="Confirmar email"
            size="small"
            color="primary"
            {...register("confirmEmail")}
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Senha"
            size="small"
            color="primary"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Confirmar senha"
            size="small"
            color="primary"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          ></TextField>
        </div>

        <p className="redirect">
          Já possui uma conta?{" "}
          <span>
            <Link to="/login">Entre!</Link>
          </span>
        </p>

        {error && <p className="error"> Usuário já existe! </p>}

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

export default Register;
