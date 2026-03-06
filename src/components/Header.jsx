import logo from '../assets/images/logo.png';
export default function Header() {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="font-semibold text-lg">Smart ERP</span>
      </div>
      <div>
        <button className="text-sm text-blue-600">Login</button>
      </div>
    </header>
  );
}
