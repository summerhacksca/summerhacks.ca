import { ApplicationFormData, Slide } from "./types";

export const INITIAL_FORM_DATA: ApplicationFormData = {
  firstNameLegal: "",
  lastNameLegal: "",
  preferredName: "",
  age: "",
  gender: "",
  ethnicity: "",
  institutionName: "",
  year: "",
  linkedin: "",
  github: "",
  resumeLink: "",
  portfolioLink: "",
  proudProject: "",
  chooseOneAnswer: "",
  summerHacksGoal: "",
  rambleTopic: "",
  bearOrMuffin: "",
  offlineSelf: "",
  dietaryRestrictions: "",
  accessibilityNeeds: "",
  tshirtSize: "",
  travelToDowntownToronto: "",
};

export const slides: Slide[] = [
  { step: 1, title: "Application", numberLabel: "1" },
  { step: 2, title: "About you", numberLabel: "2" },
  { step: 3, title: "Review", numberLabel: "3" },
];

export const genderOptions = [
  "Female",
  "Male",
  "Non-binary",
  "Another identity",
  "Prefer not to say",
];

export const ethnicityOptions = [
  "Asian",
  "Black",
  "Indigenous",
  "Latin American",
  "Middle Eastern / North African",
  "White",
  "Mixed / Multiple",
  "Prefer not to say",
  "Self-describe",
];

export const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
export const yesNoOptions = ["Yes", "No"];

export const imgOrangeSun = "/logos/orange-nobg.svg";
export const orange = "/graphics/orange.svg";
