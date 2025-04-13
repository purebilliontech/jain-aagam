import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type ReactElement } from "react";

type ProtectRouteProps = {
  children: ReactElement;
};

export const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return children;
  } else if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        LOADING
      </div>
    );
  } else {
    router.push("/admin");
  }
};
