import DOMPurify from "isomorphic-dompurify";

/**
 * Liste de mots interdits pour protéger l'intégrité de la base de données
 * et empêcher le contenu inapproprié
 */
const BLACKLISTED_WORDS = [
  // Injections SQL communes
  "drop table",
  "delete from",
  "insert into",
  "update set",
  "select *",
  "union select",
  "exec(",
  "execute(",
  "xp_",
  "sp_",
  "--",
  "/*",
  "*/",

  // Scripts dangereux
  "<script",
  "</script>",
  "javascript:",
  "onerror=",
  "onload=",
  "onclick=",
  "eval(",
  "expression(",

  // Contenu inapproprié - Spam et publicité
  "spam",
  "viagra",
  "casino",
  "crypto",
  "bitcoin",
  "trading",

  // Insultes françaises
  "connard",
  "connasse",
  "salope",
  "pute",
  "putain",
  "bordel",
  "merde",
  "enculé",
  "enculer",
  "fils de pute",
  "fdp",
  "ntm",
  "ta gueule",
  "ferme ta gueule",
  "con",
  "conne",
  "connerie",
  "salaud",
  "salopard",
  "ordure",
  "crétin",
  "débile",
  "abruti",
  "idiot",
  "imbécile",
  "taré",
  "tarée",
  "baltringue",
  "bouffon",
  "batard",
  "bâtard",
  "enfoiré",

  // Termes à caractère sexuel explicite
  "sexe",
  "sex",
  "porn",
  "porno",
  "pornographie",
  "xxx",
  "bite",
  "queue",
  "chatte",
  "con",
  "foutre",
  "baiser",
  "sucer",
  "suce",
  "suceuse",
  "pipe",
  "fellation",
  "sodomie",
  "sodomiser",
  "penetration",
  "pénétration",
  "éjaculation",
  "ejaculation",
  "orgasme",
  "masturbation",
  "masturber",
  "branleur",
  "branler",
  "couille",
  "couilles",
  "testicule",
  "pénis",
  "penis",
  "vagin",
  "clitoris",
  "seins",
  "nichons",
  "tétons",
  "cul",
  "anus",
  "fesse",
  "fesses",

  // Termes discriminatoires et haineux
  "negro",
  "nègre",
  "négro",
  "sale noir",
  "sale arabe",
  "sale juif",
  "bougnoule",
  "bamboula",
  "youpin",
  "rastaquouère",
  "métèque",
  "pd",
  "pédé",
  "tapette",
  "gouine",
  "tantouze",

  // Incitations à la violence
  "tuer",
  "mort",
  "crever",
  "suicide",
  "suicider",
  "cancer",
  "violer",
  "viol",
  "violence",
  "frapper",
  "cogner",
  "buter",
];

/**
 * Patterns regex dangereux à détecter
 */
const DANGEROUS_PATTERNS = [
  /(<script[\s\S]*?>[\s\S]*?<\/script>)/gi, // Scripts
  /(javascript:)/gi, // Javascript dans les URLs
  /(on\w+\s*=)/gi, // Event handlers (onclick, onerror, etc.)
  /(<iframe[\s\S]*?>)/gi, // Iframes
  /(data:text\/html)/gi, // Data URIs HTML
  /(vbscript:)/gi, // VBScript
  /(\bexec\s*\()/gi, // Exec calls
  /(\beval\s*\()/gi, // Eval calls
];

/**
 * Nettoie une chaîne de caractères contre les attaques XSS
 * @param {string} input - La chaîne à nettoyer
 * @returns {string} - La chaîne nettoyée
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== "string") return "";

  // Nettoyer avec DOMPurify
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // N'autorise aucune balise HTML
    ALLOWED_ATTR: [], // N'autorise aucun attribut
    KEEP_CONTENT: true, // Garde le contenu textuel
  });

  // Trim les espaces
  return cleaned.trim();
};

/**
 * Nettoie une URL en vérifiant qu'elle est sécurisée
 * @param {string} url - L'URL à nettoyer
 * @returns {string} - L'URL nettoyée ou vide si dangereuse
 */
export const sanitizeUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  const cleaned = url.trim();

  // Vérifie que l'URL commence par http:// ou https://
  if (!/^https?:\/\//i.test(cleaned)) {
    return "";
  }

  // Vérifie qu'il n'y a pas de javascript: ou data: URIs
  if (/^(javascript|data|vbscript):/i.test(cleaned)) {
    return "";
  }

  return DOMPurify.sanitize(cleaned, {
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
};

/**
 * Vérifie si une chaîne contient des mots interdits
 * @param {string} input - La chaîne à vérifier
 * @returns {Object} - { isValid: boolean, foundWords: string[] }
 */
export const checkBlacklist = (input) => {
  if (!input || typeof input !== "string") {
    return { isValid: true, foundWords: [] };
  }

  const lowerInput = input.toLowerCase();
  const foundWords = [];

  // Vérifier les mots interdits
  for (const word of BLACKLISTED_WORDS) {
    if (lowerInput.includes(word.toLowerCase())) {
      foundWords.push(word);
    }
  }

  return {
    isValid: foundWords.length === 0,
    foundWords,
  };
};

/**
 * Vérifie si une chaîne contient des patterns dangereux
 * @param {string} input - La chaîne à vérifier
 * @returns {boolean} - true si dangereux, false sinon
 */
export const containsDangerousPatterns = (input) => {
  if (!input || typeof input !== "string") return false;

  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(input));
};

/**
 * Validation complète d'une chaîne de caractères
 * @param {string} input - La chaîne à valider
 * @param {Object} options - Options de validation
 * @returns {Object} - { isValid: boolean, sanitized: string, errors: string[] }
 */
export const validateAndSanitize = (input, options = {}) => {
  const {
    maxLength = 5000,
    minLength = 0,
    allowUrls = false,
    fieldName = "Ce champ",
  } = options;

  const errors = [];

  // Vérifier si vide
  if (!input || typeof input !== "string") {
    if (minLength > 0) {
      errors.push(`${fieldName} est requis`);
    }
    return { isValid: false, sanitized: "", errors };
  }

  // Nettoyer d'abord
  const sanitized = allowUrls ? sanitizeUrl(input) : sanitizeInput(input);

  // Vérifier la longueur
  if (sanitized.length < minLength) {
    errors.push(`${fieldName} doit contenir au moins ${minLength} caractères`);
  }

  if (sanitized.length > maxLength) {
    errors.push(`${fieldName} ne peut pas dépasser ${maxLength} caractères`);
  }

  // Vérifier les mots interdits
  const blacklistCheck = checkBlacklist(sanitized);
  if (!blacklistCheck.isValid) {
    errors.push(
      `${fieldName} contient des mots interdits: ${blacklistCheck.foundWords.join(
        ", "
      )}`
    );
  }

  // Vérifier les patterns dangereux
  if (containsDangerousPatterns(sanitized)) {
    errors.push(`${fieldName} contient du contenu potentiellement dangereux`);
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
};

/**
 * Valide et nettoie un nombre
 * @param {any} input - La valeur à valider
 * @param {Object} options - Options de validation
 * @returns {Object} - { isValid: boolean, value: number, errors: string[] }
 */
export const validateNumber = (input, options = {}) => {
  const {
    min = -Infinity,
    max = Infinity,
    integer = false,
    fieldName = "Ce champ",
  } = options;

  const errors = [];

  // Convertir en nombre
  const num = Number(input);

  // Vérifier si c'est un nombre valide
  if (isNaN(num)) {
    errors.push(`${fieldName} doit être un nombre valide`);
    return { isValid: false, value: 0, errors };
  }

  // Vérifier si c'est un entier (si requis)
  if (integer && !Number.isInteger(num)) {
    errors.push(`${fieldName} doit être un nombre entier`);
  }

  // Vérifier les limites
  if (num < min) {
    errors.push(`${fieldName} doit être supérieur ou égal à ${min}`);
  }

  if (num > max) {
    errors.push(`${fieldName} doit être inférieur ou égal à ${max}`);
  }

  return {
    isValid: errors.length === 0,
    value: num,
    errors,
  };
};

/**
 * Valide un tableau d'objets (pour les étapes et ingrédients)
 * @param {Array} items - Le tableau à valider
 * @param {Function} validator - Fonction de validation pour chaque item
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateArray = (items, validator, minItems = 1) => {
  const errors = [];

  if (!Array.isArray(items)) {
    errors.push("Format de données invalide");
    return { isValid: false, errors };
  }

  if (items.length < minItems) {
    errors.push(`Au moins ${minItems} élément(s) requis`);
    return { isValid: false, errors };
  }

  // Valider chaque item
  items.forEach((item, index) => {
    const result = validator(item, index);
    if (!result.isValid) {
      errors.push(
        ...result.errors.map((err) => `Élément ${index + 1}: ${err}`)
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Échappe les caractères spéciaux pour éviter les injections SQL
 * Note: Cette fonction est une protection additionnelle côté client,
 * mais la vraie protection doit être faite côté serveur avec des requêtes préparées
 * @param {string} input - La chaîne à échapper
 * @returns {string} - La chaîne échappée
 */
export const escapeSqlChars = (input) => {
  if (!input || typeof input !== "string") return "";

  return input
    .replace(/'/g, "''") // Échappe les apostrophes
    .replace(/\\/g, "\\\\") // Échappe les backslashes
    .replace(/\0/g, "\\0") // Échappe les null bytes
    .replace(/\n/g, "\\n") // Échappe les nouvelles lignes
    .replace(/\r/g, "\\r") // Échappe les retours chariot
    .replace(/\x1a/g, "\\Z"); // Échappe Ctrl+Z
};

export default {
  sanitizeInput,
  sanitizeUrl,
  checkBlacklist,
  containsDangerousPatterns,
  validateAndSanitize,
  validateNumber,
  validateArray,
  escapeSqlChars,
};
