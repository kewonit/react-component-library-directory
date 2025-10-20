export default function Footer() {
  return (
    <footer className="border-t border-gray-200/80 bg-white mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 gap-2">
            <div className="flex flex-col text-sm">
              <span>This project is not sponsored or affiliated</span>
              <span>with anything mentioned above.</span>
            </div>
            <a
              href="https://github.com/kewonit/react-component-library-directory"
              className="text-blue-600 hover:underline"
            >
              Contribute
            </a>
          </div>
      </div>
    </footer>
  );
}
