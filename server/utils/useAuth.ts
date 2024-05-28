import * as jose from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function useAuth(event: any, roles: string[] = []) {
  const { headers } = event;
  const authorization = headers.get("Authorization");
  if (!authorization) {
    return {
      Verified: false,
      payload: null,
    };
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const verify = await jose.jwtVerify(token, secret, {
      audience: "authenticated",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = verify.payload as any;
    if (!payload) {
      return {
        Verified: false,
        payload: null,
      };
    }
    // const role =
    //   if (roles.length && !roles.includes(role)) {
    //     return {
    //       Verified: false,
    //       payload: null,
    //     };
    //   }
    return {
      Verified: true,
      payload,
    };
  } catch (err) {
    return {
      Verified: false,
      payload: null,
    };
  }
}
