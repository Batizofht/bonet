/**
 * Third-party photos from Wikimedia Commons, with the attribution their
 * licences require. Shown on /photo-credits and under article photos.
 * Images were resized for the web; no other changes were made.
 */
export type PhotoCredit = {
  src: string;
  subject: string;
  author: string;
  license: "CC0" | "CC BY 2.0" | "CC BY 4.0" | "CC BY-SA 2.0" | "CC BY-SA 4.0";
  source: string;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

export const LICENSE_URL: Record<PhotoCredit["license"], string> = {
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
};

export const PHOTO_CREDITS: PhotoCredit[] = [
  { src: "/assets/photos/kcc-aerial.jpg", subject: "Aerial view of the Kigali Convention Centre", author: "Emmanuel Kwizera", license: "CC BY-SA 4.0", source: commons("An aerial of Kigali Convention Center on June 19, 2019. Photo by Emmanuel Kwizera.jpg") },
  { src: "/assets/photos/kigali-skyline.jpg", subject: "Kigali at dusk", author: "Adrien K", license: "CC BY 2.0", source: commons("Kigali2018.jpg") },
  { src: "/assets/photos/kigali-cbd.jpg", subject: "Buildings in Kigali's central business district", author: "Schlawgclart", license: "CC0", source: commons("Buildings in Kigali CBD, Rwanda.jpg") },
  { src: "/assets/photos/kigali-cbd-2.jpg", subject: "Office towers in central Kigali", author: "Schlawgclart", license: "CC0", source: commons("Buildings in Kigali CBD, Rwanda 2.jpg") },
  { src: "/assets/photos/kigali-cbd-3.jpg", subject: "Kigali central business district", author: "Schlawgclart", license: "CC0", source: commons("Buildings in Kigali CBD, Rwanda 1.jpg") },
  { src: "/assets/photos/kigali-tower.jpg", subject: "Office building in Kigali", author: "Schlawgclart", license: "CC0", source: commons("Building in Kigali, Rwanda.jpg") },
  { src: "/assets/photos/kacyiru.jpg", subject: "Kacyiru, Kigali", author: "IGANZE", license: "CC0", source: commons("Kacyiru in Kigali.jpg") },
  { src: "/assets/photos/kigali-golf.jpg", subject: "Kigali Golf Club, Nyarutarama", author: "Gilbert Sibomana", license: "CC BY-SA 4.0", source: commons("Kigali Golf Club.jpg") },
  { src: "/assets/photos/kigali-street.jpg", subject: "Kigali city street from above", author: "Emmanuel Kwizera", license: "CC BY-SA 4.0", source: commons("High Angle View Of Kigali City Street on November 29, 2018. Emmanuel Kwizera.jpg") },
  { src: "/assets/photos/car-free-zone.jpg", subject: "Kigali car-free zone", author: "ROSEMURA250", license: "CC BY-SA 4.0", source: commons("Kigali City Car free Zone Monument.jpg") },
  { src: "/assets/photos/conference-2.jpg", subject: "Conference hall at the Kigali Convention Centre", author: "World Travel & Tourism Council", license: "CC BY 2.0", source: commons("Day 2 - November 02 2023 GS Rwanda (53306826524).jpg") },
  { src: "/assets/photos/tea-harvest.jpg", subject: "Tea harvest in Rwanda", author: "Rogerirakoze", license: "CC BY-SA 4.0", source: commons("Tea harvesting 261224.jpg") },
  { src: "/assets/photos/tea-sorwathe.jpg", subject: "Sorwathe tea plantation", author: "Jeremy Weate", license: "CC BY 2.0", source: commons("Sorwathe Tea Plantation, Rwanda.jpg") },
  { src: "/assets/photos/coffee.jpg", subject: "Coffee cherry in Rwanda", author: "François Terrier", license: "CC BY 2.0", source: commons("Coffee bean in Rwanda.jpg") },
  { src: "/assets/photos/kivu.jpg", subject: "Boating on Lake Kivu", author: "Ludovic Hirlimann", license: "CC BY-SA 4.0", source: commons("Boating on lake Kivu.jpg") },
  { src: "/assets/photos/kivu-hill.jpg", subject: "Lake Kivu from the hills", author: "Ericnkurunziza", license: "CC BY-SA 4.0", source: commons("Lake Kivu on top of Hill.jpg") },
  { src: "/assets/photos/gorilla.jpg", subject: "Mountain gorilla, Volcanoes National Park", author: "Charles J. Sharp", license: "CC BY-SA 4.0", source: commons("Mountain gorilla (Gorilla beringei beringei) female 3.jpg") },
  { src: "/assets/photos/nyungwe.jpg", subject: "Nyungwe Forest panorama", author: "Dpiskho", license: "CC BY-SA 4.0", source: commons("Nyungwe Panorama.jpg") },
  { src: "/assets/photos/akagera.jpg", subject: "Lake in Akagera National Park", author: "John Cooke", license: "CC BY 2.0", source: commons("Lake in Akagera National Park.jpg") },
];

export const creditFor = (src: string) => PHOTO_CREDITS.find((c) => c.src === src);
