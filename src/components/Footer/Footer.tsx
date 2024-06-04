/* eslint-disable import/order */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './Footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer_link_content">
        <Link to={'/contact'} >Contacts </Link>
        <Link to={'/mentionsLegales'}>Mentions légales</Link>
        <Link to={'/aPropos'}>A propos</Link>
      </div>
      <div className="footer_text_content">
        <p>L'inspiration culinaire à portée de clic</p>
      </div>
    </footer>
  );
}
