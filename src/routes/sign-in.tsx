import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const SignInPage = () => (
  <SignIn
    appearance={{
      baseTheme: dark,
    }}
  />
);

export default SignInPage;
