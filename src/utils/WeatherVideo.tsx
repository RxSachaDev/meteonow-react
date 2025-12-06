export const weatherVideoMap: Record<string, string> = {
  // Groupe 2xx: Orage
  "orage avec légère pluie": "/src/assets/background/orage.mp4",
  "orage avec pluie": "/src/assets/background/orage.mp4",
  "orage avec forte pluie": "/src/assets/background/orage.mp4",
  "orage léger": "/src/assets/background/orage.mp4",
  "orage": "/src/assets/background/orage.mp4",
  "orage violent": "/src/assets/background/orage.mp4",
  "orage irrégulier": "/src/assets/background/orage.mp4",
  "orage avec légère bruine": "/src/assets/background/orage.mp4",
  "orage avec bruine": "/src/assets/background/orage.mp4",
  "orage avec forte bruine": "/src/assets/background/orage.mp4",

  // Groupe 3xx: Bruine
  "bruine légère": "/src/assets/background/pluie.mp4",
  "bruine": "/src/assets/background/pluie.mp4",
  "bruine forte": "/src/assets/background/pluie.mp4",
  "légère bruine de pluie": "/src/assets/background/pluie.mp4",
  "bruine de pluie": "/src/assets/background/pluie.mp4",
  "forte bruine de pluie": "/src/assets/background/pluie.mp4",
  "averses de bruine et pluie": "/src/assets/background/pluie.mp4",
  "fortes averses de bruine et pluie": "/src/assets/background/pluie.mp4",
  "averses de bruine": "/src/assets/background/pluie.mp4",

  // Groupe 5xx: Pluie
  "légère pluie": "/src/assets/background/pluie.mp4",
  "pluie modérée": "/src/assets/background/pluie.mp4",
  "forte pluie": "/src/assets/background/pluie.mp4",
  "très forte pluie": "/src/assets/background/pluie.mp4",
  "pluie extrême": "/src/assets/background/pluie.mp4",
  "pluie verglaçante": "/src/assets/background/pluie.mp4",
  "légères averses": "/src/assets/background/pluie.mp4",
  "averses": "/src/assets/background/pluie.mp4",
  "fortes averses": "/src/assets/background/pluie.mp4",
  "averses irrégulières": "/src/assets/background/pluie.mp4",

  // Groupe 6xx: Neige
  "légère neige": "/src/assets/background/neige.mp4",
  "neige": "/src/assets/background/neige.mp4",
  "forte neige": "/src/assets/background/neige.mp4",
  "neige fondue": "/src/assets/background/neige.mp4",
  "légères averses de neige fondue": "/src/assets/background/neige.mp4",
  "averses de neige fondue": "/src/assets/background/neige.mp4",
  "légère pluie et neige": "/src/assets/background/neige.mp4",
  "pluie et neige": "/src/assets/background/neige.mp4",
  "légères averses de neige": "/src/assets/background/neige.mp4",
  "averses de neige": "/src/assets/background/neige.mp4",
  "fortes averses de neige": "/src/assets/background/neige.mp4",
  "légères chutes de neige": "/src/assets/background/neige.mp4",

  // Groupe 7xx: Atmosphère
  "brume": "/src/assets/videos/mist.mp4",
  "fumée": "/src/assets/videos/smoke.mp4",
  "brume sèche": "/src/assets/videos/haze.mp4",
  "tourbillons de sable/poussière": "/src/assets/videos/dust.mp4",
  "brouillard": "/src/assets/background/brouillard.mp4",
  "sable": "/src/assets/videos/sand.mp4",
  "poussière": "/src/assets/videos/dust.mp4",
  "cendres volcaniques": "/src/assets/videos/ash.mp4",
  "bourrasques": "/src/assets/videos/wind.mp4",
  "tornade": "/src/assets/videos/tornado.mp4",

  // Groupe 800: Ciel dégagé
  "ciel dégagé": "/src/assets/background/soleil.mp4",

  // Groupe 80x: Nuages
  "peu nuageux": "/src/assets/background/soleil-nuage.mp4",
  "partiellement nuageux": "/src/assets/background/soleil-nuage.mp4",
  "nuageux": "/src/assets/background/nuageux.mp4",
  "couvert": "/src/assets/background/nuageux.mp4",
};

// Fonction pour obtenir la vidéo appropriée
export const getWeatherVideo = (description: string): string => {
  const normalizedDescription = description.toLowerCase().trim();
  return weatherVideoMap[normalizedDescription] || "/src/assets/videos/clear-sky.mp4"; // Vidéo par défaut
};