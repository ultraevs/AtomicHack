import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { useDropzone } from "react-dropzone";
import { convertFileToBase64 } from "../../helpers";
import { setImgList, uploadImg } from "../../state/slices/ImgList/ImgListSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Layout } from "../../layout/Layout";
import { ModelResult } from "../../components/ModelResult";
import { IsAuth } from "../../components/HOC";
// eslint-disable-next-line no-unused-vars
React;

const Main = () => {
  const dispatch = useDispatch();
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [file, setFile] = useState<any[]>([]);
  const [indexOfTheFile, setIndexOfTheFile] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFile) => {
      setIsFileLoaded(true);
      setIsComment(true);

      setFile(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const fileImg = file.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      className={styles.img}
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  const buttonConfirmClick = async () => {
    setIsComment(false);
    try {
      const base64String = await convertFileToBase64(file[0]);
      dispatch(
        uploadImg({ img: base64String.split(",")[1], comment: comment })
      );
    } catch (error) {
      console.error("Ошибка при преобразовании файла в base64:", error);
    }
  };

  const buttonClearClick = () => {
    dispatch(setImgList({ items: [] }));
    setIsFileLoaded(false);
    setFile([]);
  };

  useEffect(() => {
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const items = useSelector((store: RootState) => store.imgList.items);
  const objects = useSelector((store: RootState) => store.imgList.objects);

  return (
    <Layout>
      <div className={cn("container", styles.page)}>
        {items.length ? (
          <ModelResult
            items={items}
            fileIndex={indexOfTheFile}
            setFileIndex={setIndexOfTheFile}
          />
        ) : (
          <div {...getRootProps({ className: `${styles.dropzone}` })}>
            {isFileLoaded ? (
              <>{fileImg}</>
            ) : (
              <>
                <input {...getInputProps()} />
                <p>
                  Загрузите фото
                  <br />
                  <span>Нажмите на это окно</span>
                </p>
              </>
            )}
          </div>
        )}
        {isComment ? (
          <div className={styles.comment}>
            <input
              type="text"
              placeholder="Комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
        <button
          className={
            isFileLoaded
              ? cn(styles.button, styles.buttonConfirm)
              : cn(styles.button, styles.buttonClear)
          }
          style={{ marginTop: items.length ? 23 : isComment ? 32 : 75 }}
          onClick={() => {
            if (items.length) {
              buttonClearClick();
            } else {
              buttonConfirmClick();
            }
          }}
        >
          {items.length ? "Очистить" : "Подтвердить"}
        </button>
        <div className={styles.objects}>
          {objects.map((item) => (
            <div key={item[1]}>
              <p>
                {item[0]}: <span>{item[1]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IsAuth(Main);
