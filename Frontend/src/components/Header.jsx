export default function Header() {
  return (
    <header
      className="w-full h-28 flex justify-center items-center 
                   bg-gradient-to-r from-black via-gray-900 to-gray-800
                   dark:from-gray-950 dark:via-gray-900 dark:to-black
                   shadow-lg backdrop-blur-md rounded"
    >
      <h1
        className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-500 
                       dark:from-purple-300 dark:via-pink-300 dark:to-fuchsia-400
                       bg-clip-text text-transparent tracking-wide drop-shadow-md"
      >
        🚀 File Share Anywhere
      </h1>
    </header>
  );
}
