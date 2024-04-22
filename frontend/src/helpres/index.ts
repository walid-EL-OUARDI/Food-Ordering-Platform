export const url = (imageUrl: string) => {
  return import.meta.env.VITE_REACT_APP_URL + imageUrl;
};

export const getImage = (image: File, id: string) => {
  const output = document.getElementById(id);
  if (output && "src" in output) {
    output.src = URL.createObjectURL(image);
  }
};
