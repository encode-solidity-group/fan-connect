import CreatePage from "./CreatePage";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import { useContext } from "react";

interface PageProps {
  queryAddress: string | string[] | undefined;
}

export default function RedirectToCreate({ queryAddress }: PageProps) {
  const {userAddress} = useContext(UserAddressContext);
  return (
    <div className="flex flex-col justify-center items-center space-y-4 my-16 text-xl">
      <div className="italic">
        *User {queryAddress} is not a creator*
      </div>
      {queryAddress === userAddress &&
        <>
          <div className="text-2xl">Become a creator today for free!</div>
          <CreatePage />
        </>
      }
    </div>
  )
}
