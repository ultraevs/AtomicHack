import React, { useEffect } from "react";
import styles from "./styles.module.css"
import { Layout } from "../../layout/Layout";
import { infoUser } from "../Auth/http";
import { mockData } from "../../consts/mock";
import { HistoryItem } from "../../components/HistoryItem";
// eslint-disable-next-line no-unused-vars
React;

const History = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await infoUser()
      console.log(response)
    }

    getData()
  }, [])
  
  return (
    <Layout>
      <div className="container">
        <div className={styles.history__items}>
          {mockData.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export { History };
