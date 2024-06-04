import './Apropos.scss';

export default function APropos() {
  return (
    <>
      <h2 className='title_aPropos'>A PROPOS</h2>
      <h3 className='small_title_aPropos'>Qui sommes-nous ?</h3>
      <div>La team O'Fourneau est constituée de 4 dev :</div>
      <h4 className='small_title_aPropos'>TEAM BACK</h4>
      <div>La partie back end du site a été developpée par l'incroyable Estelle Belleil et le très talentueux Elias Bentouhami.</div>
      <h4 className='small_title_aPropos'>TEAM FRONT</h4>
      <div>Le rendu visuel de ce site a été rendu possible grâce à la collaboration de deux developpeurs au talent indéniable : Médy Daniel et Aubry Boulet.</div>
      <h4 className='small_title_aPropos'>L'origine du projet</h4>
      <div>Le site O'Fourneau a été développé comme projet de fin de formation avec l'école O'Clock dans le but de le présenter au passage de notre titre professionnel.</div>
    
    

      <div className="container_contact">
        <div className="card_contact">
          <div className="image">
            <img src="https://media.licdn.com/dms/image/D4E03AQEGK8A2ZONTeQ/profile-displayphoto-shrink_100_100/0/1707125593379?e=1714608000&v=beta&t=bdjB94yNSIjTqEw7CGE6Gj78PZs71Du9F_K8LtA6woQ" alt="" />
          </div>
          <div className="name">Estelle Belleil</div>

          
        </div>
        <div className="card_contact">
          <div className="image">
            <img src="https://media.licdn.com/dms/image/D4E03AQEPTA7PeTen4Q/profile-displayphoto-shrink_100_100/0/1689427892138?e=1714608000&v=beta&t=b6oZvuYXNDJQzkkhRCcdzkOecTLPCfj1cEby2Z5b4tc" alt="" />
          </div>
          <div className="name">Elias Bentouhami</div>

         
        </div>
        <div className="card_contact">
          <div className="image">
            <img src="" alt="" />
          </div>
          <div className="name">Aubry Boulet</div>

  
        </div>
        <div className="card_contact">
          <div className="image">
            <img src="https://media.licdn.com/dms/image/D4E03AQGoCYaibkybrQ/profile-displayphoto-shrink_200_200/0/1707148474425?e=1714608000&v=beta&t=m7Tot26C-Tq9Ri8U9caMCTJn7rAYfcSODGwzCWDwolw" alt="" />
          </div>
          <div className="name">Medy Daniel</div>

        </div>
      </div>    
    </>
  );
}
