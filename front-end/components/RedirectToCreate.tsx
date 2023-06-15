import { useRouter } from "next/router";

interface PageProps {
  queryAddress: string | string[] | undefined;
  userAddress: string | undefined;
}

export default function RedirectToCreate({ queryAddress, userAddress }: PageProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center space-y-4 my-16 text-xl">
      <div>
        User {queryAddress} is not a creator
      </div>
      {queryAddress === userAddress &&
        <>
          <div>Click to become a creator</div>
          <button className="enterButton" onClick={() => router.push(`/profile/${userAddress}/create`)} >
            <div className="base">Start Creating</div>
            <div className="onHover">Start Creating</div>
          </button>
        </>
      }
    </div>
  )
}
