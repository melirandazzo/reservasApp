const images = {
  "cochera.png": require("../../assets/cochera.png"),
  "parrilla.png": require("../../assets/parrilla.png"),
  "terraza.png": require("../../assets/terraza.png"),
  "salon.png": require("../../assets/salon.png"),
  "oficina.png": require("../../assets/oficina.png"),
  "espacios.png": require("../../assets/espacios.png"),
  "pileta.png": require("../../assets/pileta.png"),
};

export const getImage = (imagePath) => {
  const filename = imagePath.split("/").pop();
  return images[filename];
};