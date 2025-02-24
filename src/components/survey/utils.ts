
import { UserLevel } from "./types";

export const calculateUserLevel = (income: string): UserLevel => {
  if (income === "Menos de $1,000") return "Bronce";
  if (income === "$1,000 - $3,000") return "Plata";
  if (income === "$3,000 - $5,000") return "Oro";
  if (income === "$5,000 - $10,000") return "Diamante";
  if (income === "$10,000 - $15,000") return "Platino";
  return "Grey Platinum";
};
