import CreatePage from "./CreatePage";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import { useContext } from "react";
import { QueryAddressContext } from "../../providers/QueryAddressProvider";

export default function RedirectToCreate() {
  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);

  return (
    <div className="flex flex-col justify-center items-center space-y-4 my-16 text-xl p-4">
      <div className="italic text-center break-all">
        {queryAddress}<br />is not a creator
      </div>
      {queryAddress === userAddress &&
        <>
          <div className="text-2xl text-center">Become a creator today for free!</div>
          <CreatePage />
        </>
      }
    </div>
  )
}
