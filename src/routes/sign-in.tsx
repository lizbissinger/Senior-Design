import { SignIn } from "@clerk/clerk-react";
import Overview from "../components/Overview/Overview";

export default function SignInPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#7392e9",
      }}
    >
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl={"dashboard/Overview"}
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: "#7392e9",
              "&:hover": { backgroundColor: "#7392e9" },
            },
            formFieldAction: {
              color: "#7392e9",
              "&:hover": { color: "#7392e9" },
            },
            footerActionLink: {
              color: "#7392e9",
              "&:hover": { color: "#7392e9" },
            },
            headerSubtitle: {
              fontFamily: "myFont",
            },
          },
        }}
      />
    </div>
  );
}
