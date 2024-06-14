import React, { useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { AuthLayout } from "../../layout/AuthLayout";
// eslint-disable-next-line no-unused-vars
React;

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginInput = (e: any) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterInput = (e: any) => {
    const { name, value } = e.target;
    setRegisterInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AuthLayout>
      <div className={cn("container", styles.auth)}>
        <div className={styles.auth__select}>
          <p
            className={isLogin ? styles.active : ""}
            onClick={() => setIsLogin(true)}
          >
            Войти
          </p>
          <span>/</span>
          <p
            className={!isLogin ? styles.active : ""}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </p>
        </div>
        {isLogin ? (
          <>
            <div className={styles.auth__form}>
              <input
                type="text"
                placeholder="Электронная почта"
                name="email"
                value={loginInput.email}
              />
              <input
                type="password"
                placeholder="Пароль"
                name="password"
                value={loginInput.password}
              />
            </div>
            <div className={cn(styles.auth__button, styles.authButton)}>
              <button>Войти</button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.auth__form}>
              <input type="text" placeholder="Имя" value={registerInput.name} />
              <input
                type="text"
                placeholder="Электронная почта"
                value={registerInput.email}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={registerInput.password}
              />
            </div>
            <div className={cn(styles.auth__button, styles.registerButton)}>
              <button>Зарегистрироваться</button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export { Auth };
