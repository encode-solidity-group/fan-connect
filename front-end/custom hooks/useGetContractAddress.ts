import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export default function useGetContractAddress() {
  const { chain } = useNetwork();
  const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    if (chain?.id === 1313161555) {
      setContractAddress("0x41154096EC43fBd3072580536683e10e6F573120");
    }
    if (chain?.id === 11155111) {
      setContractAddress("0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6");
    }
    if (chain?.id === 1313161554) {
      setContractAddress("0x9f356A72ad859CE2C598CD2e5AC3f82bb49e5428");
    }
  }, [chain]);

  return { contractAddress };
}
