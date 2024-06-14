import React, { useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { AuthLayout } from "../../layout/AuthLayout";
import { loginUser } from "./http";
import { useNavigate } from "react-router-dom";
import { setAuthTokenCookie } from "../../helpers";
// eslint-disable-next-line no-unused-vars
React;

const Auth = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState<LoginInput>({
    id: "",
    password: "",
  });

  const handleLoginInput = (e: any) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buttonClick = async () => {
    if (loginInput.id !== "" && loginInput.password !== "") {
      try {
        const response = await loginUser(loginInput);

        if (response.success) {
          setAuthTokenCookie(response.data);
          navigate("/");
        } else {
          alert("Ошибка: " + response.error);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Что-то не так");
    }
  };

  return (
    <AuthLayout>
      <div className={cn("container", styles.auth)}>
        <div className={styles.auth__select}>
          <p>Вход</p>
        </div>
        <div className={styles.auth__form}>
          <input
            type="text"
            placeholder="Ваш ID"
            name="id"
            value={loginInput.id}
            onChange={handleLoginInput}
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={loginInput.password}
            onChange={handleLoginInput}
          />
        </div>
        <div className={styles.auth__button}>
          <button onClick={buttonClick}>Войти</button>
        </div>
      </div>
    </AuthLayout>
  );
};

export { Auth };
