import { atom } from "recoil";

export const codeAtom = atom<string>({
  key: "codeAtom",
  default: "",
});

export const inputAtom = atom<string | null>({
  key: "inputAtom",
  default: null,
});

export const outputAtom = atom<{
  status: "not loaded" | "loading" | "loaded";
  value: string;
}>({
  key: "outputAtom",
  default: {
    status: "not loaded",
    value: "",
  },
});

export const languageAtom = atom({
  key: "languageAtom",
  default: "cpp",
});

