import { apiClient } from "@/lib/utils";
import { codeAtom, inputAtom, languageAtom, outputAtom } from "@/store/store";
import { useRecoilState, useRecoilValue } from "recoil";

const useCodeActions = () => {
  const code = useRecoilValue(codeAtom);
  const language = useRecoilValue(languageAtom);
  const input = useRecoilValue(inputAtom);
  const [output, setOutput] = useRecoilState(outputAtom);

  async function getCodeResult(token: string) {
    try {
      const res = await apiClient.get(`/submissions/${token}`);
      const data = res.data;
      if (data.status.id === 1 || data.status.id === 2) {
        getCodeResult(token);
      } else {
        setOutput({
          status: "loaded",
          value: JSON.stringify(data)
        })
        return data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function submitCode() {
    try {
      setOutput({
        status: "loading",
        value: output.value,
      });
  
      const res = await apiClient.post(
        "/submissions",
        {
          source_code: code,
          language_id: parseInt(language, 10),
          stdin: input,
        },
        {
          params: {
            // base64_encoded: true,
          },
        }
      );
  
      let data;
      try {
        data = res.data;
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        throw new Error("Failed to parse JSON response");
      }
  
      return getCodeResult(data.token);
    } catch (error) {
      console.error("Error in submitCode:", error);
      return error;
    }
  }

  return { submitCode };
};

export default useCodeActions;
