import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: "#7392e9",
              "&:hover": { backgroundColor: "#7392e9" },
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
      ;
    </div>
  );
}
