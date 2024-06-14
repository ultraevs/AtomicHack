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
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  name: string;
  password: string;
}
