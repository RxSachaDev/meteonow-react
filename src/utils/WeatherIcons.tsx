import { 
  WiDaySunny, 
  WiCloudy, 
  WiCloud,
  WiRain,
  WiDayRain,
  WiShowers,
  WiRainMix,
  WiSnow,
  WiSnowflakeCold,
  WiSleet,
  WiThunderstorm,
  WiFog,
  WiDust,
  WiSmoke,
  WiTornado,
  WiStrongWind
} from 'react-icons/wi';
import type { IconType } from 'react-icons';

// Descriptions en français avec leurs icônes correspondantes
export const weatherIconMap: Record<string, IconType> = {
  // Groupe 2xx: Orage
  "orage avec légère pluie": WiThunderstorm,
  "orage avec pluie": WiThunderstorm,
  "orage avec forte pluie": WiThunderstorm,
  "orage léger": WiThunderstorm,
  "orage": WiThunderstorm,
  "orage violent": WiThunderstorm,
  "orage irrégulier": WiThunderstorm,
  "orage avec légère bruine": WiThunderstorm,
  "orage avec bruine": WiThunderstorm,
  "orage avec forte bruine": WiThunderstorm,

  // Groupe 3xx: Bruine
  "bruine légère": WiShowers,
  "bruine": WiShowers,
  "bruine forte": WiShowers,
  "légère bruine de pluie": WiShowers,
  "bruine de pluie": WiShowers,
  "forte bruine de pluie": WiShowers,
  "averses de bruine et pluie": WiShowers,
  "fortes averses de bruine et pluie": WiShowers,
  "averses de bruine": WiShowers,

  // Groupe 5xx: Pluie
  "légère pluie": WiDayRain,
  "pluie modérée": WiRain,
  "forte pluie": WiRain,
  "très forte pluie": WiRain,
  "pluie extrême": WiRain,
  "pluie verglaçante": WiRainMix,
  "légères averses": WiShowers,
  "averses": WiShowers,
  "fortes averses": WiShowers,
  "averses irrégulières": WiShowers,

  // Groupe 6xx: Neige
  "légère neige": WiSnow,
  "neige": WiSnow,
  "forte neige": WiSnowflakeCold,
  "neige fondue": WiSleet,
  "légères averses de neige fondue": WiSleet,
  "averses de neige fondue": WiSleet,
  "légère pluie et neige": WiRainMix,
  "pluie et neige": WiRainMix,
  "légères averses de neige": WiSnow,
  "averses de neige": WiSnow,
  "fortes averses de neige": WiSnowflakeCold,

  // Groupe 7xx: Atmosphère
  "brume": WiFog,
  "fumée": WiSmoke,
  "brume sèche": WiFog,
  "tourbillons de sable/poussière": WiDust,
  "brouillard": WiFog,
  "sable": WiDust,
  "poussière": WiDust,
  "cendres volcaniques": WiSmoke,
  "bourrasques": WiStrongWind,
  "tornade": WiTornado,

  // Groupe 800: Ciel dégagé
  "ciel dégagé": WiDaySunny,

  // Groupe 80x: Nuages
  "peu nuageux": WiCloud,
  "partiellement nuageux": WiCloud,
  "nuageux": WiCloudy,
  "couvert": WiCloudy,
};

export const getWeatherIcon = (description: string): IconType => {
  const normalizedDescription = description.toLowerCase().trim();
  return weatherIconMap[normalizedDescription] || WiDaySunny; // Icône par défaut
};
