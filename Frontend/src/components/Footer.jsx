function Footer() {
  return (
    <footer className="bg-gray-800 p-4 border-t border-gray-700 font-inter">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} React App. All rights reserved.</p>
        <p className="mt-1">Built with React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
export default Footer;