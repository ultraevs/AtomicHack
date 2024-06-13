import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import { useDropzone } from "react-dropzone";
// eslint-disable-next-line no-unused-vars
React;

const Main = () => {
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [file, setFile] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFile) => {
      console.log(acceptedFile);
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

  useEffect(() => {
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  console.log(file);

  return (
    <section className={cn("container", styles.page)}>
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
      <button
        className={
          isFileLoaded
            ? cn(styles.button, styles.buttonConfirm)
            : cn(styles.button, styles.buttonClear)
        }
      >
        Подтвердить
      </button>
    </section>
  );
};

export { Main };
