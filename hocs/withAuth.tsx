import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
      const getUser = async () => {
        // const response = await fetch("http://localhost:4000/user/me");
        // const userData = await response.json();
        // if (!userData) {
        //   router.push("/admin/login");
        // } else {
        //   setData(userData);
        // }
        console.log("auth");
      };
      getUser();
    }, []);

    // return !!data ? <Component data={data} /> : null;
    return <Component data={data} />;
  };

  return AuthenticatedComponent;
};
