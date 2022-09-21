import rockGlass from '../images/rockGlass.svg';
import '../css/Logo.css';
import '../App.css';

export default function Logo() {
  return (
    <div className="pageContainer">
      <div className="logoContainer">
        <span className="logo">Disk Pinga - Grupo 20</span>
        <object className="rocksGlassLogo" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object>
      </div>
    </div>
  );
}
