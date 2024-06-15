import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { Layout } from "../../layout/Layout";
import { infoUser } from "../Auth/http";
import { HistoryItem } from "../../components/HistoryItem";
import { IsAuth } from "../../components/HOC";
import { getAdminItems, getUserItems } from "./http";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
React;

const History = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [isPersonalHistory, setIsPersonalHistory] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      const response = await infoUser();
      window.localStorage.setItem("isAdmin", response.data.is_admin);

      const responseItems = await getUserItems();
      setItems(responseItems.data);
    };

    getData();
  }, []);

  const onPersonalClick = async () => {
    const response = await getUserItems();
    setItems(response.data);
    setIsPersonalHistory(true);
  };

  const onAdminClick = async () => {
    const response = await getAdminItems();
    setItems(response.data);
    setIsPersonalHistory(false);
  };

  const onExitClick = () => {
    window.localStorage.setItem("isAuth", "false");
    navigate("/auth");
  };

  return (
    <Layout>
      <div className={cn("container", styles.history)}>
        {JSON.parse(window.localStorage.getItem("isAdmin") || "false") ? (
          <>
            <div className={styles.history__select}>
              <p onClick={() => onPersonalClick()}>Личная</p>
              <p onClick={() => onAdminClick()}>Общая</p>
            </div>
            <div className={styles.history__items}>
              {items.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={styles.history__items}>
              {items.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        <div className={styles.history__button}>
          <button onClick={() => onExitClick()}>Выйти</button>
        </div>
      </div>
    </Layout>
  );
};

export default IsAuth(History);
