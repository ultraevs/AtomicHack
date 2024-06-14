import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { useDropzone } from "react-dropzone";
import { convertFileToBase64 } from "../../helpers";
import { setImgList, uploadImg } from "../../state/slices/ImgList/ImgList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
// eslint-disable-next-line no-unused-vars
React;

const Main = () => {
  const dispatch = useDispatch();
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [file, setFile] = useState<any[]>([]);
  const [indexOfTheFile, setIndexOfTheFile] = useState<number>(0);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFile) => {
      setIsFileLoaded(true);

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
    try {
      const base64String = await convertFileToBase64(file[0]);
      const response = dispatch(uploadImg(base64String.split(",")[1]));
    } catch (error) {
      console.error("Ошибка при преобразовании файла в base64:", error);
    }
  };

  const buttonClearClick = () => {
    dispatch(setImgList({ items: [] }));
    setIsFileLoaded(false);
    setFile([])
  };

  useEffect(() => {
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const items = useSelector((store: RootState) => store.imgList.items);

  return (
    <section className={cn("container", styles.page)}>
      {items.length ? (
        <>
          <div className={styles.dropzone}>
            <img
              src={`data:image/jpeg;base64,${items[indexOfTheFile]}`}
              alt={`${indexOfTheFile} ml image`}
            />
          </div>
          <div className={styles.tumblers}>
            {items.map((item, index) => (
              <div
                key={item}
                className={
                  indexOfTheFile === index
                    ? cn(styles.tumbler, styles.active)
                    : styles.tumbler
                }
                onClick={() => setIndexOfTheFile(index)}
              >
                <span></span>
              </div>
            ))}
          </div>
        </>
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

      <button
        className={
          isFileLoaded
            ? cn(styles.button, styles.buttonConfirm)
            : cn(styles.button, styles.buttonClear)
        }
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
    </section>
  );
};

export { Main };
