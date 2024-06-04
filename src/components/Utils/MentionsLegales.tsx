import './MentionsLegales.scss'

export default function MentionsLegales() {
  return (
    <>
      <h2 className='title_mentionsLegales'>Mentions légales</h2>
      <h3 className='small_title_mentionsLegales'>Editeur</h3>
      <div>Team O'Fourneau :</div>
      <ul>
        <li>Médy Daniel</li>
        <li>Aubry Boulet</li>
        <li>Estelle Belleil</li>
        <li>Elias Bentouhami</li>
      </ul>
      <h3 className='small_title_mentionsLegales'>Propriété intellectuelle</h3>
      <div>
        Le site peut contenir des images ou photos provenant d'autres sites
        internet. L’Editeur n’exerce aucun contrôle sur les contenus des sites
        Internet tiers et ne pourra être tenu responsable des dommages directs
        ou indirects résultant de la consultation de ces contenus.
      </div>
      <h3 className='small_title_mentionsLegales'>Hebergeur du site</h3>
    </>
  );
}
