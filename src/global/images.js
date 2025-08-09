const images = {
  "cochera.png": require("../../assets/cochera.png"),
  "parrilla.png": require("../../assets/parrilla.png"),
  "terraza.png": require("../../assets/terraza.png"),
  "salon.png": require("../../assets/salon.png"),
  "oficina.png": require("../../assets/oficina.png"),
};

export const getImage = (imagePath) => {
  const filename = imagePath.split("/").pop();
  return images[filename];
};