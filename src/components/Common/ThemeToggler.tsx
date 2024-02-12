import { useTheme } from "next-themes";

// Separate components for light and dark logos
const LightLogo = () => (
  <svg viewBox="0 0 23 23" className="w-5 h-5 stroke-current dark:hidden md:h-6 md:w-6" fill="none">
    {/* Light theme logo path */}
  </svg>
);

const DarkLogo = () => (
  <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden w-5 h-5 dark:block md:h-6 md:w-6">
    {/* Dark theme logo path */}
  </svg>
);

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white md:h-14 md:w-14"
    >
      {theme === "dark" ? <LightLogo /> : <DarkLogo />}
    </button>
  );
};

export default ThemeToggler;
