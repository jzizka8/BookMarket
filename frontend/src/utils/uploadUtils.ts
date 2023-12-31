/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '../firestore';

export const uploadImage = async (username: string, file?: File[]) => {
  if (!file || file.length === 0) {
    const url =
      'https://firebasestorage.googleapis.com/v0/b/pb138-book-market.appspot.com/o/default-placeholder.png?alt=media&token=38534c5d-e1db-4c15-96fb-83ddb23fc38b';
    return url;
  }
  const imageName = `${username}/${uuidv4()}`;
  const storageRef = ref(storage, imageName);
  await uploadBytes(storageRef, file[0]);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const extractPath = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  const regex = /\/o\/([^?]+)\?/i;
  const match = regex.exec(decodedUrl);
  if (match) {
    return match[1];
  }
  return null;
};

export const deleteBookImage = async (url: string) => {
  if (!url.includes('/o/default-placeholder.png?')) {
    const path = extractPath(url);
    await deleteObject(ref(storage, path!));
  }
};
