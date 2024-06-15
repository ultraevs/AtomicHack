import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { Layout } from "../../layout/Layout";
import { infoUser } from "../Auth/http";
import { HistoryItem } from "../../components/HistoryItem";
import { IsAuth } from "../../components/HOC";
import { getAdminItems, getUserItems } from "./http";
import { useNavigate } from "react-router-dom";
import { Filter } from "../../components/Filter";
import { CloseOutlined } from "@ant-design/icons";
// eslint-disable-next-line no-unused-vars
React;

const History = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [isPersonalHistory, setIsPersonalHistory] = useState<boolean>(true);
  const [filters, setFilters] = useState<any>({
    name: "",
    date: "",
    status: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    const response = await getAdminItems(filters);
    setItems(response.data);
    setIsPersonalHistory(false);
  };

  const onExitClick = () => {
    window.localStorage.setItem("isAuth", "false");
    navigate("/auth");
  };

  const filterSubmit = async () => {
    const response = await getAdminItems(filters);
    setItems(response.data);
  };

  const onClearClick = async () => {
    setFilters({
      name: "",
      date: "",
      status: "",
    });
    const response = await getAdminItems({
      name: "",
      date: "",
      status: "",
    });
    setItems(response.data);
  };

  return (
    <Layout>
      <div className={cn("container", styles.history)}>
        {JSON.parse(window.localStorage.getItem("isAdmin") || "false") ? (
          <>
            <div className={styles.history__select}>
              <p
                className={isPersonalHistory ? styles.active : ""}
                onClick={() => onPersonalClick()}
              >
                Личная
              </p>
              <p
                className={!isPersonalHistory ? styles.active : ""}
                onClick={() => onAdminClick()}
              >
                Общая
              </p>
            </div>
            {JSON.parse(window.localStorage.getItem("isAdmin") || "false") ? (
              <div className={styles.history__filters}>
                <Filter
                  title="Имя"
                  submit={filterSubmit}
                  inputName="name"
                  inputValue={filters.name}
                  onChangeValue={handleInput}
                />
                <Filter
                  title="Дефект"
                  submit={filterSubmit}
                  inputName="status"
                  inputValue={filters.status}
                  onChangeValue={handleInput}
                />
                <Filter
                  title="Дата"
                  submit={filterSubmit}
                  inputName="date"
                  inputValue={filters.date}
                  onChangeValue={handleInput}
                />
                <div
                  className={styles.history__filters__clear}
                  onClick={() => onClearClick()}
                >
                  <CloseOutlined />
                </div>
              </div>
            ) : (
              <></>
            )}
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
