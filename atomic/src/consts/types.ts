interface FileItem {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface LoginInput {
  id: string;
  password: string;
}

interface HistoryItem {
  date: string;
  id: number;
  name: string;
  photo: string;
  result: string;
  status: string;
}
